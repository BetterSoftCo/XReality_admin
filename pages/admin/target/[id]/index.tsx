import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import AdminLayout from 'layouts/AdminLayout'
import { NextApiResponse } from 'next'
import { ViewGridAddIcon, XIcon } from '@heroicons/react/outline'

const TargetDetails = ({ target }: any) => {
  const { data: session } = useSession()
  const [userId, setUserId] = useState('')

  useEffect(() => {
    setUserId(session?.user?.id)
  }, [])

  const router = useRouter()

  const showToast = (type: string) => {
    if (type == 'success') {
      toast.success('فرم با موفقیت ارسال شد', {
        position: 'bottom-center',
      })
    } else if (type == 'error') {
      toast.error('خطا در ارسال فرم', {
        position: 'bottom-center',
      })
    }
  }

  const initialValues = {
    title: '',
    titleTr1: '',
    subtitle: '',
    link: '',
    color: '',
    useCase: '',
    type: '',
  }

  const onSubmit = async (values: any, e: any) => {
    const JSONdata = JSON.stringify(values)
    const endpoint = 'https://xrealityapi.sinamn75.com/api/Category'
    const options = {
      method: 'PUT',
      headers: {
        Accept: 'text/plain',
        Authorization: `${session?.accessToken}`,
        'Content-Type': 'application/json-patch+json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    if (result.status == 200) {
      showToast('success')
    }
    if (result.status == 401) showToast('error')
  }

  const validationSchema = Yup.object({
    title: Yup.string(),
    titleTr1: Yup.string(),
    subtitle: Yup.string(),
    link: Yup.string(),
    color: Yup.string(),
    useCase: Yup.string(),
    type: Yup.string(),
  })

  return (
    <>
      {session ? (
        <>
          <Toaster />
          <AdminLayout>
            <div className="px-8">
              <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                تارگت: {target.title}
              </h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formProps) => (
                  <Form
                    action="https://xrealityapi.sinamn75.com/api/Category"
                    method="PUT"
                  >
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="grid grid-cols-6 gap-6 p-8">
                        {/* عکس تارگت */}
                        <div className="col-span-12 sm:col-span-6">
                          <label className="block text-sm fontmedium text-gray-700">
                            عکس تارگت
                          </label>
                          <div
                            className={`mt-1 flex justify-center px-6 py-10 border-2 border-gray-300 border-dashed rounded-md`}
                          >
                            <div className="space-y-1 text-center bg-white">
                              <ViewGridAddIcon className="mx-auto h-8 w-8 text-gray-300 group-hover:text-white" />
                              <div className="flex text-lg text-gray-600">
                                <label
                                  htmlFor="media"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-nonefocus-within:ring-indigo-500"
                                >
                                  <span>عکس تارگت</span>
                                  <input
                                    id="media"
                                    name="media"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={(e: any) => {
                                      formProps.setFieldValue(
                                        'media',
                                        e.target.files[0],
                                      )
                                    }}
                                  />
                                </label>
                                <p className="pr-1">(حداکثر 10 مگابایت)</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, JPEG
                              </p>
                            </div>
                          </div>
                          {/* <div className="mt-5">
                            {formProps.values.media ? (
                              <>
                                {setImage(formProps.values.media)}
                                <PreviewImage file={formProps.values.media} />
                                <XIcon
                                  className="w-7 h-7 bg-gray-200 text-indigo-600 rounded-lg p-1 cursor-pointer"
                                  onClick={() => {
                                    setImage(null)
                                  }}
                                />
                              </>
                            ) : null}
                          </div> */}
                        </div>
                        {/* عنوان */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            عنوان
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="عنوان"
                            value={target.title}
                          />
                        </div>
                        {/* عنوان 1 */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="titleTr1"
                            className="block text-sm font-medium text-gray-700"
                          >
                            عنوان 1
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="titleTr1"
                            name="titleTr1"
                            placeholder="عنوان 1"
                            value={target.titleTr1}
                          />
                        </div>
                        {/* زیرعنوان */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="subtitle"
                            className="block text-sm font-medium text-gray-700"
                          >
                            زیرعنوان
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="subtitle"
                            name="subtitle"
                            placeholder="زیرعنوان"
                            value={target.subtitle}
                          />
                        </div>
                        {/* لینک */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="link"
                            className="block text-sm font-medium text-gray-700"
                          >
                            لینک
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="link"
                            name="link"
                            placeholder="لینک"
                            value={target.link}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        ارسال
                      </button>
                      <Link href="/admin/target">
                        <a className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-2">
                          لغو
                        </a>
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </AdminLayout>
        </>
      ) : (
        'Some super secret'
      )}
    </>
  )
}

export default TargetDetails

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  const { params, query } = context

  //TODO: BACKEND SHOULD COMPLETE -GETBYID
  const endpoint = `https://xrealityapi.sinamn75.com/api/Category/${query.id}`
  const options = {
    method: 'GET',
    headers: {
      Accept: 'text/plain',
      Authorization: `${session?.accessToken}`,
    },
  }
  const response = await fetch(endpoint, options)
  const target = await response.json()
  if (!target) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      session,
      target: target.result,
    },
  }
}
