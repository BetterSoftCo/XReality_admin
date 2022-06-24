import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      // id: 'credentials',
      name: 'credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        mobile: {
          label: 'mobile',
          type: 'text',
          placeholder: '09132148040',
        },
        verificationCode: {
          label: 'verificationCode',
          type: 'text',
        },
      },

      async authorize(credentials, req) {
        const payload = {
          mobile: credentials.mobile,
          verificationCode: credentials.verificationCode,
        }

        const res = await fetch(
          `https://xrealityapi.sinamn75.com/api/user/VerifyMobileForLogin`,
          {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json',
              mobile: credentials.mobile,
              'Accept-Language': 'en-US',
            },
          },
        )

        const user = await res.json()
        console.log('user', user.result)

        if (!res.status == 200) {
          throw new Error(user.exception)
        }
        // If no error and we have user data, return it
        if (res.status == 200 && user) {
          // console.log('user.result', user.result)
          return user.result
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: 'test',
    encryption: true,
  },
  pages: {
    signIn: '/auth/signin', //Need to define custom login page (if using)
  },
  callbacks: {
    // Getting the JWT token from API response
    async jwt({ token, user, account }) {
      if (account && user) {
        token.id = user.id
        token.phoneNumber = user.phoneNumber
        token.userName = user.userName
        token.fullName = user.fullName
        return {
          ...token,
          accessToken: user.token,
          // refreshToken: user.data.refreshToken,
        }
      }
      return token
    },

    async session({ session, token }) {
      // session.user.accessToken = token.accessToken
      session.user.id = token.id
      session.user.phoneNumber = token.phoneNumber
      session.user.userName = token.userName
      session.user.fullName = token.fullName
      session.accessToken = 'Bearer ' + token.accessToken

      return session
    },
  },
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '', // Hex color code #33FF5D
    logo: '/logo.png', // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
})
