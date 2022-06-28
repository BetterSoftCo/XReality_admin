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
import { ViewGridAddIcon, XIcon } from '@heroicons/react/outline'
import { StarIcon } from '@heroicons/react/solid'

const AddTarget = () => {
  const { data: session } = useSession()
  const [userId, setUserId] = useState('')
  const [image, setImage] = useState(null)

  var categoryId = ''

  const router = useRouter()

  useEffect(() => {
    setUserId(session?.user?.id)
  }, [image])

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
    media: null,
  }

  const addData = async (values: any) => {
    const JSONdata = JSON.stringify(values)
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
      categoryId = result.result.id.toString()
      console.log('result', result)

      //add media
      addDataMedia(values)
    }
    if (result.status == 401) showToast('error')
  }

  const addDataMedia = async (values: any) => {
    const formData = new FormData()

    formData.append('UserId', userId)
    formData.append('NotificationId', '')
    formData.append('ProductId', '')
    formData.append('Visibility', '')
    formData.append('ContentId', '')
    formData.append('UseCase', 'category')
    formData.append('UserId', userId)
    formData.append('files', values.media)
    formData.append('Title', `${values.media.name}`)
    formData.append('CategoryId', `${categoryId}`)

    const endpointMedia = 'https://xrealityapi.sinamn75.com/api/Media'
    const optionsMedia = {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        Authorization: `${session?.accessToken}`,
      },
      body: formData,
    }

    const responseMedia = await fetch(endpointMedia, optionsMedia)

    const resultMedia = await responseMedia.json()
    console.log('resultMedia', resultMedia)

    if (resultMedia.status == 200) {
      showToast('success')
      router.push('/admin/target')
    }
    if (resultMedia.status == 401) showToast('error')
  }

  const onSubmit = async (values: any) => {
    addData(values)
  }

  // const handleReset = (resetForm: any) => {
  //   resetForm()
  // }

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

  // const handleDeleteFile = (idx: any) => {
  //   var files_result = imageFiles
  //     .filter((file, index) => index !== idx)
  //     .map((file) => file)

  //   setImageFiles(files_result)
  // }

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
              >
                {(formProps) => (
                  <Form
                    action="https://xrealityapi.sinamn75.com/api/Category"
                    method="POST"
                  >
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="grid grid-cols-6 gap-6 p-8">
                        {/* عکس تارگت */}
                        <div className="col-span-12 sm:col-span-6">
                          <label className="block text-sm fontmedium text-gray-700">
                            آپلود عکس تارگت
                            <StarIcon className="w-2 h-2 text-red-500 inline" />
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
                          {/* preview image */}
                          <div className="mt-5">
                             {formProps.values.media ? (
                              <>
                                <PreviewImage file={formProps.values.media} />
                                <button>
                                  <XIcon
                                    className="w-7 h-7 bg-gray-200 text-indigo-600 rounded-lg p-1 cursor-pointer"
                                    // onClick={() => {
                                    //   handleDeleteFile(idx)
                                    // }}
                                  />
                                </button>
                              </>
                            ) : null}
                          </div>
                        </div>
                        {/* عنوان */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            عنوان
                            <StarIcon className="w-2 h-2 text-red-500 inline" />
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="title"
                            name="title"
                            placeholder="عنوان"
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="text-red-500 text-right mt-1"
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
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // onClick={handleReset.bind(null, formProps.resetForm)}
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
