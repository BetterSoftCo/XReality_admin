import { PencilIcon, XIcon } from '@heroicons/react/outline'
import AdminLayout from 'layouts/AdminLayout'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

type contentType = {
  id: ''
  title: ''
  subtitle: ''
  description: ''
  details: ''
  type: ''
  unit: ''
  useCase: ''
  length: 0
  width: 0
  height: 0
  weight: 0
  status: 0
}

const Contents = ({ contents }: any) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const showAlert = (contentId: string) => {
    Swal.fire({
      title: 'حذف محتوا',
      text: 'آیا اطمینان به حذف محتوا دارید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34d399',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'آره مطمئنم',
      cancelButtonText: 'حالا نه',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContent(contentId)
        Swal.fire({
          title: 'محتوا با موفقیت حذف شد',
          icon: 'success',
          confirmButtonText: 'حله',
        })
      }
    })
  }

  const deleteContent = async (contentId: string) => {
    const endpoint = `https://xrealityapi.sinamn75.com/api/Product/${contentId}`
    const options = {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    if (response.status == 200) {
      router.push('/admin/content')
    }
  }

  return (
    <>
      <AdminLayout>
        {contents && (
          <div className="px-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col justify-center items-start">
                <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                  محتوا ها
                </h2>
              </div>
              <Link href="/admin/content/add">
                <a className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  افزودن محتوا
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
                        زیرعنوان
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        توضیحات
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        جزییات
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        نوع
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        واحد
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        useCase
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        طول
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        عرض
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        ارتفاع
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        وزن
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        وضعیت
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-600">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contents.map((content: contentType, index: number) => (
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
                              {content.title}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {content.subtitle}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {content.description}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-yellow-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-yellow-100 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">
                                {content.details}
                              </span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-blue-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-blue-100 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">{content.type}</span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-700 leading-tight">
                              <span
                                aria-hidden
                                className="absolute inset-0 bg-green-100 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">{content.unit}</span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {content.useCase}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {content.length}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {content.width}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {content.height}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {content.weight}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {content.status}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex justify-center items-center gap-x-4">
                              <Link href={`content/${content.id}`} passHref>
                                <a>
                                  <PencilIcon className="w-5 text-green-500  cursor-pointer" />
                                </a>
                              </Link>
                              <XIcon
                                className="w-5 text-red-500 cursor-pointer"
                                onClick={() => showAlert(content.id)}
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
        {/* {!contents && <SkeletonArticle />} */}
      </AdminLayout>
    </>
  )
}

export default Contents

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  const getAllContent = async () => {
    const endpoint = 'https://xrealityapi.sinamn75.com/api/Product'
    const options = {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    const contents = await response.json()
    if (!contents) {
      return {
        notFound: true,
      }
    }
    return contents
  }

  var contents = await getAllContent()

  return {
    props: {
      session,
      contents: contents.result,
    },
  }
}
