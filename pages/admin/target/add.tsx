import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect, useRef } from 'react'
import AdminLayout from 'layouts/AdminLayout'
import { NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import { PreviewImage } from 'components/Preview'
import Image from 'next/image'
import { values } from 'lodash'
import { url } from 'inspector'

const AddTarget = () => {
  const { data: session } = useSession()
  const [userId, setUserId] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const router = useRouter()

  useEffect(() => {
    setUserId(session?.user?.id)
  }, [])

  const showToast = (type: any) => {
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
    media: null,
  }

  const addData = async (values: any) => {
    const JSONdata = JSON.stringify(values)
    console.log('values', values)

    const endpoint = 'https://xrealityapi.sinamn75.com/api/Category'
    const options = {
      method: 'POST',
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
      setCategoryId(result.result.id)
    }
    if (result.status == 401) showToast('error')
  }

  const addDataMedia = async (valuesMedia: any) => {
    // var mediaList = []
    // mediaList[0] = {
    //   // type: `${valuesMedia.type}`,
    //   type: 0,
    //   useCase: 'category',
    //   link: '',
    //   title: `${valuesMedia.name}`,
    // }
    // console.log('mediaList[0]', mediaList[0])

    // const JSONdataMedia = JSON.stringify(mediaList[0])
    //
    // console.log('JSONdataMedia', JSONdataMedia)

    const endpointMedia = 'https://xrealityapi.sinamn75.com/api/Media'
    const optionsMedia = {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        Authorization: `${session?.accessToken}`,
        'Content-Type': 'multipart/form-data',
        UserId: `${userId}`,
        NotificationId: '',
        ProductId: '',
        Visibility: '1',
        ContentId: '',
        UseCase: 'category',
        Files: `@${valuesMedia.name};type=${valuesMedia.type}`,
        Title: `${valuesMedia.name}`,
        CategoryId: `${categoryId}`,
      },
      // body: JSONdataMedia,
    }

    const responseMedia = await fetch(endpointMedia, optionsMedia)
    const resultMedia = await responseMedia.json()

    console.log('responseMedia', responseMedia)

    if (resultMedia.status == 200) {
      showToast('success')
      router.push('/admin/target')
    }
    if (resultMedia.status == 401) showToast('error')
  }

  const onSubmit = async (values: any, e: any) => {
    //-------------add data---------------
    await addData(values)
    //------------add media data----------
    await addDataMedia(values.media)
  }

  const validationSchema = Yup.object({
    title: Yup.string(),
    titleTr1: Yup.string(),
    subtitle: Yup.string(),
    link: Yup.string(),
    color: Yup.string(),
    useCase: Yup.string(),
    type: Yup.string(),
    media: Yup.mixed().required(),
  })

  return (
    <>
      {session ? (
        <>
          <Toaster />
          <AdminLayout>
            <div className="px-8">
              <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                افزودن تارگت
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enctype="multipart/form-data"
              >
                {(formProps) => (
                  <Form
                    action="https://xrealityapi.sinamn75.com/api/Category"
                    method="POST"
                  >
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="grid grid-cols-6 gap-6 p-8">
                        {formProps.values.media ? (
                          <PreviewImage file={formProps.values.media} />
                        ) : null}

                        {/* عکس تارگت */}
                        <div className="col-span-12 sm:col-span-6">
                          <label className="block text-sm fontmedium text-gray-700">
                            آپلود عکس تارگت
                          </label>
                          <div
                            className={`mt-1 flex justify-center px-6 py-10 border-2 border-gray-300 border-dashed rounded-md`}
                            // style={{
                            //   backgroundImage: `url(${formProps.values.media})`,
                            // }}
                          >
                            <div className="space-y-1 text-center bg-white">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
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
                                    onChange={(e) => {
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
                          />
                        </div>
                        {/* رنگ */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="color"
                            className="block text-sm font-medium text-gray-700"
                          >
                            رنگ
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="color"
                            name="color"
                            placeholder="رنگ"
                          />
                        </div>
                        {/* useCase */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="useCase"
                            className="block text-sm font-medium text-gray-700"
                          >
                            useCase
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="useCase"
                            name="useCase"
                            placeholder="useCase"
                          />
                        </div>
                        {/* نوع */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            نوع
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="type"
                            name="type"
                            placeholder="نوع"
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

export default AddTarget

export async function getServerSideProps(context: NextApiResponse) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}