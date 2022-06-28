import { PencilIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import ManagerLayout from 'layouts/ManagerLayout'

type chatType = {
  id: ''
  userId: ''
  messageText: ''
  fullName: ''
  dateTime: ''
  profileImage: ''
  send: false
}

export default function ChatManager({ chats }: any) {
  const { data: session } = useSession()
  const router = useRouter()
  var rowNumber = 0

  return (
    <>
      <ManagerLayout>
        {chats && (
          <div className="px-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col justify-center items-start">
                <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                  مدیریت تیکت ها
                </h2>
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      {/* شماره ردیف */}
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        شماره ردیف
                      </th>
                      {/* نام کامل */}
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        نام کامل
                      </th>
                      {/* متن پیام */}
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        متن پیام
                      </th>
                      {/* عکس پروفایل */}
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        عکس پروفایل
                      </th>
                      {/* عملیات */}
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chats.map((chat: chatType) => (
                      <>
                        <tr>
                          {/* شماره ردیف */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {rowNumber + 1}
                                </p>
                              </div>
                            </div>
                          </td>
                          {/* نام کامل */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {chat.fullName}
                            </p>
                          </td>
                          {/* متن پیام */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-blue-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-blue-100 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">
                                {chat.messageText}
                              </span>
                            </span>
                          </td>
                          {/* عکس پروفایل */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-thin text-md text-gray-700 leading-tight">
                              <span className="relative">
                                {chat.profileImage}
                              </span>
                            </span>
                          </td>
                          {/* عملیات */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex justify-center items-center gap-x-4">
                              <Link href={`chat/${chat.userId}`} passHref>
                                <a>
                                  <PencilIcon className="w-5 text-green-500  cursor-pointer" />
                                </a>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                  <span className="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 4 of 50 Entries
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                      قبلی
                    </button>
                    &nbsp; &nbsp;
                    <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                      بعدی
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ManagerLayout>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  const getAllChats = async () => {
    const endpoint = `https://xrealityapi.sinamn75.com/api/Chat`
    const options = {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    const chats = await response.json()
    if (!chats) {
      return {
        notFound: true,
      }
    }
    console.log('chats', chats)

    return chats
  }

  var chats = await getAllChats()

  return {
    props: {
      session,
      chats: chats.result,
    },
  }
}
