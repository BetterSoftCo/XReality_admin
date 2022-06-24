import { PencilIcon, XIcon } from '@heroicons/react/outline'
import AdminLayout from 'layouts/AdminLayout'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

type targetType = {
  id: string
  parentId: string
  title: string
  titleTr1: string
  subtitle: string
  link: string
  color: string
  useCase: string
  type: string
}

const Targets = ({ targets }: any) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const showAlert = (targetId: string) => {
    Swal.fire({
      title: 'حذف تارگت',
      text: 'آیا اطمینان به حذف تارگت دارید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34d399',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'آره مطمئنم',
      cancelButtonText: 'حالا نه',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTarget(targetId)
        Swal.fire({
          title: 'تارگت با موفقیت حذف شد',
          icon: 'success',
          confirmButtonText: 'حله',
        })
      }
    })
  }

  const deleteTarget = async (targetId: string) => {
    const endpoint = `https://xrealityapi.sinamn75.com/api/category/${targetId}`
    const options = {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    if (response.status == 200) {
      router.push('/admin/target')
    }
  }

  return (
    <>
      <AdminLayout>
        {targets && (
          <div className="px-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col justify-center items-start">
                <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                  تارگت ها
                </h2>
              </div>
              <Link href="/admin/target/add">
                <a className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  افزودن تارگت
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
                        عنوان
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        عنوان1
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        زیرعنوان
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        لینک
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        رنگ
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        usecase
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        type
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {targets.map((target: targetType, index: number) => (
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
                              {target.title}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {target.titleTr1}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {target.subtitle}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-yellow-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-yellow-100 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">{target.link}</span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-blue-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-blue-100 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">{target.color}</span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-100 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">{target.useCase}</span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {target.type}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex justify-center items-center gap-x-4">
                              <Link href={`target/${target.id}`} passHref>
                                <a>
                                  <PencilIcon className="w-5 text-green-500  cursor-pointer" />
                                </a>
                              </Link>
                              <XIcon
                                className="w-5 text-red-500 cursor-pointer"
                                onClick={() => showAlert(target.id)}
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
        {/* {!targets && <SkeletonArticle />} */}
      </AdminLayout>
    </>
  )
}

export default Targets

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  const getAllTarget = async () => {
    const endpoint = 'https://xrealityapi.sinamn75.com/api/category'
    const options = {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    const targets = await response.json()
    if (!targets) {
      return {
        notFound: true,
      }
    }
    return targets
  }

  var targets = await getAllTarget()

  return {
    props: {
      session,
      targets: targets.result,
    },
  }
}