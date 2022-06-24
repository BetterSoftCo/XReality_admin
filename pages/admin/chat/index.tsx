import { LockClosedIcon, PencilIcon, XIcon } from '@heroicons/react/outline'
import AdminLayout from 'layouts/AdminLayout'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import { NextApiResponse } from 'next'

type chatType = {
  id: string
  messageText: string
  fullName: string
  dateTime: string
  profileImage: string
  send: boolean
}

const Chats = ({ chats }: any) => {
  return (
    <>
      <AdminLayout>
        <div className="px-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                چت ها
              </h2>
            </div>
            <Link href="/admin/chat/add">
              <a className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                چت جدید
              </a>
            </Link>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                      شماره ردیف
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                      تصویر پروفایل
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                      نام و نام خانوادگی
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                      متن پیام
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                      تاریخ
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                      خوانده شده
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chats.map((chat: chatType, index: number) => (
                    <>
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {index + 1}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            <div className="flex-shrink-0 w-10 h-10">
                              <Image
                                width={50}
                                height={50}
                                className="rounded-full"
                                src="/images/logo.png"
                                alt=""
                              />
                            </div>
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {chat.fullName}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {chat.messageText}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-yellow-700 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-yellow-100 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">{chat.dateTime}</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {chat.send ? (
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-100 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">{chat.send}</span>
                            </span>
                          ) : (
                            <span className="relative inline-block px-3 py-1 font-semibold text-red-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-red-100 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">{chat.send}</span>
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Link href={`chat/${chat.id}`} passHref>
                            <a className="group relative flex justify-center py-1 px-0.5 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                              مشاهده
                            </a>
                          </Link>
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
      </AdminLayout>
    </>
  )
}

export default Chats

export async function getServerSideProps(context: NextApiResponse) {
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
  const chats = await response.json()
  if (!chats) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      session,
      chats: chats.result,
    },
  }
}
