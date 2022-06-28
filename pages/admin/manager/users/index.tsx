import { PencilIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import ManagerLayout from 'layouts/ManagerLayout'

type userType = {
  id: ''
  fullName: ''
  phoneNumber: ''
  userName: ''
  appUserName: ''
  appPhoneNumber: ''
  wallet: 0
  isAdmin: false
  suspend: false
  media: []
  categories: []
  products: []
}

export default function UsersManager({ users }: any) {
  const { data: session } = useSession()
  const router = useRouter()

  const showAlert = (userId: string) => {
    Swal.fire({
      title: 'حذف کاربر',
      text: 'آیا اطمینان به حذف کاربر دارید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34d399',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'آره مطمئنم',
      cancelButtonText: 'حالا نه',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId)
        Swal.fire({
          title: 'کاربر با موفقیت حذف شد',
          icon: 'success',
          confirmButtonText: 'حله',
        })
      }
    })
  }

  const deleteUser = async (userId: string) => {
    console.log('userId', userId)

    const endpoint = `https://xrealityapi.sinamn75.com/api/user/${userId}`
    const options = {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    if (response.status == 200) {
      router.push('/admin/manager')
    }
  }

  return (
    <>
      <ManagerLayout>
        {users && (
          <div className="px-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col justify-center items-start">
                <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                  مدیریت کاربران
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
                      {/* شماره موبایل */}
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        شماره موبایل
                      </th>
                      {/* نام کاربری */}
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        نام کاربری
                      </th>
                      {/* نقش کاربر */}
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        نقش کاربر
                      </th>
                      {/* عملیات */}
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: userType, index: number) => (
                      <>
                        <tr>
                          {/* شماره ردیف */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {index + 1}
                                </p>
                              </div>
                            </div>
                          </td>
                          {/* نام کامل */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {user.fullName}
                            </p>
                          </td>
                          {/* شماره موبایل */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-blue-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-blue-100 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">
                                {user.phoneNumber}
                              </span>
                            </span>
                          </td>
                          {/* نام کاربری */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-thin text-md text-gray-700 leading-tight">
                              <span className="relative">{user.userName}</span>
                            </span>
                          </td>
                          {/* نقش کاربر */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                              <span
                                aria-hidden
                                className={`absolute inset-0 bg-blue-100 opacity-50 rounded-full ${
                                  user.isAdmin
                                    ? 'bg-purple-300 text-purple-600'
                                    : 'bg-yellow-200 text-yellow-500'
                                } `}
                              ></span>
                              <span className="relative">
                                {user.isAdmin ? 'ادمین' : 'کاربر عادی'}
                              </span>
                            </span>
                          </td>
                          {/* عملیات */}
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex justify-center items-center gap-x-4">
                              <Link href={`user/${user.id}`} passHref>
                                <a>
                                  <PencilIcon className="w-5 text-green-500  cursor-pointer" />
                                </a>
                              </Link>
                              <XIcon
                                className="w-5 text-red-500 cursor-pointer"
                                onClick={() => showAlert(user.id)}
                              />
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
        {/* {!users && <SkeletonArticle />} */}
      </ManagerLayout>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  const getAllUsers = async () => {
    const endpoint = 'https://xrealityapi.sinamn75.com/api/User'
    const options = {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        // Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    const users = await response.json()
    if (!users) {
      return {
        notFound: true,
      }
    }
    return users
  }

  var users = await getAllUsers()

  return {
    props: {
      session,
      users: users.result,
    },
  }
}
