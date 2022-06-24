import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp

// function Auth({ children }) {
//   const { data: session, status } = useSession()
//   const isUser = !!session?.user

//   useEffect(() => {
//     if (status === 'loading') return
//     if (!isUser) signIn()
//   }, [isUser, status])

//   if (isUser) {
//     return children
//   }

//   //Session is being fetched, or no user.
//   // If no user, useEffect() will redirect.
//   return <div>Loading...</div>
// }
