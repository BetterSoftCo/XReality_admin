import { Statistics } from 'components/Statistics'
import AdminLayout from 'layouts/AdminLayout'
import { NextApiResponse } from 'next'
import { useSession, getSession } from 'next-auth/react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  return (
    <>
      {session ? (
        <AdminLayout>
          <>
            <div
              className="bg-indigo-100 border-t-4 border-indigo-500 rounded-b text-indigo-900 px-8 py-3 mx-8 shadow-md mb-8"
              role="alert"
            >
              <div className="flex">
                <div className="py-1"></div>
                <div>
                  <p className="font-bold text-lg">
                    کاربر محترم {session.user?.phoneNumber}
                  </p>
                  <p className="text-lg font-thin">به xreality خوش آمدید</p>
                </div>
              </div>
            </div>
          </>
          <Statistics />
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
  return {
    props: {
      session: await getSession(context),
    },
  }
}
