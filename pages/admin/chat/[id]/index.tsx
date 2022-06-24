import AdminLayout from 'layouts/AdminLayout'
import { getSession } from 'next-auth/react'

type chatType = {
  id: string
  messageText: string
  fullName: string
  dateTime: string
  profileImage: string
  send: boolean
}

function User({ chat }: any) {
  return (
    <>
      <AdminLayout>
        <div className="px-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                چت : {chat.userName}
              </h2>
            </div>
          </div>

          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    متن پیام
                  </label>
                  {chat.messageText}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    نام و نام خانوادگی
                  </label>
                  {chat.fullName}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    تاریخ پیام
                  </label>
                  {chat.dateTime}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    تصویر پروفایل
                  </label>
                  {chat.profileImage}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    خوانده شده
                  </label>
                  {chat.send}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}
export default User

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  const endpoint = `https://xrealityapi.sinamn75.com/api/chat/${session?.user?.id}`
  const options = {
    method: 'GET',
    headers: {
      Accept: 'text/plain',
      Authorization: `${session?.accessToken}`,
    },
  }
  const response = await fetch(endpoint, options)
  const chat = await response.json()
  if (!chat) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      session,
      chat: chat.result,
    },
  }
}
