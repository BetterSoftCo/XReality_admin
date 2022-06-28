import { CloudDownloadIcon, CloudUploadIcon } from '@heroicons/react/outline'
import { Statistics } from 'components/Statistics'
import AdminLayout from 'layouts/AdminLayout'
import { NextApiResponse } from 'next'
import { useSession, getSession } from 'next-auth/react'
import { IoLogoGooglePlaystore ,IoLogoApple} from "react-icons/io5";

export default function Dashboard({ user }: any) {
  const { data: session, status } = useSession()
  return (
    <>
      {session ? (
        <AdminLayout>
          <>
            {/* کاربر محترم {session.user?.phoneNumber} */}
            <section id="newsletter" aria-labelledby="newsletter-title">
              <div className="relative overflow-hidden bg-red-100 py-20 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:rounded-5xl md:px-16 xl:px-24 xl:py-12 rounded-xl mt-8">
                <div className="relative mx-auto grid max-w-2xl grid-cols-1 gap-x-32 gap-y-14 xl:max-w-none xl:grid-cols-2">
                  <div>
                    <p className="font-display text-4xl font-medium tracking-tighter text-red-500 sm:text-5xl">
                      XREALITY
                    </p>
                    <p className="mt-4 text-lg tracking-tight text-blue-900">
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است.
                    </p>
                  </div>
                  <form>
                    <h3 className="text-lg font-semibold tracking-tight text-blue-900">
                      <CloudDownloadIcon className="w-8 h-8 text-indigo-900 inline ml-4" />
                      دانلود اپلیکیشن
                    </h3>
                    <div className="mt-5 flex justify-start items-center">
                      <a href="/" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <IoLogoGooglePlaystore className="w-5 h-5 text-white ml-2" />
                          دانلود از گوگل پلی
                      </a>
                      <a href="/" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-3">
                          <IoLogoApple className="w-5 h-5 text-white ml-2" />
                          دانلود از اپ استور
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </>

          <Statistics
            targets={user.categories.length}
            contents={user.products.length}
          />
        </AdminLayout>
      ) : (
        'Some super secret'
      )}
    </>
  )
}

// Dashboard.auth = true

// Dashboard.auth = {
//   role: "admin",
//   loading: <LoadingSkeleton />,
//   unauthorized: "/login-with-different-user", // redirect to this url
// }

export async function getServerSideProps(context: NextApiResponse) {
  const session = await getSession(context)
  const userId = session?.user?.id

  const endpoint = `https://xrealityapi.sinamn75.com/api/user/${userId}`
  const options = {
    method: 'GET',
    headers: {
      Accept: 'text/plain',
      Authorization: `${session?.accessToken}`,
    },
  }
  const response = await fetch(endpoint, options)

  const user = await response.json()
  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      session: await getSession(context),
      user: user.result,
    },
  }
}
