import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import AdminLayout from 'layouts/AdminLayout'
import { NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import SwitchToggle from 'components/FormElement/SwitchToggle'
import {
  CubeIcon,
  VideoCameraIcon,
  ViewGridAddIcon,
  XIcon,
} from '@heroicons/react/outline'

import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm

const AddContent = () => {
  const { data: session } = useSession()
  const [userId, setUserId] = useState('')

  const router = useRouter()
  enum FILE_TYPES {
    gallery = 0,
    video = 1,
    object = 2,
  }

  const [Active, setActive] = useState(FILE_TYPES.gallery)
  const [imageFiles, setImageFiles] = useState([])
  const [images, setImages] = useState([])

  var productId = ''

  const changeHandler = (e: any) => {
    const { files } = e.target
    const validImageFiles: any = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file)
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles)
      return
    }
    toast.error('لطفا عکس با فرمت مناسب آپلود کنید')
  }

  useEffect(() => {
    setUserId(session?.user?.id)
    // preview uploaded images
    const images: any = [],
      fileReaders: any[] = []
    let isCancel = false
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader()
        fileReaders.push(fileReader)
        fileReader.onload = (e) => {
          const { result }: any = e.target
          if (result) {
            images.push(result)
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images)
          }
        }
        fileReader.readAsDataURL(file)
      })
    }
    console.log('images', images)

    return () => {
      isCancel = true
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort()
        }
      })
    }
  }, [imageFiles])

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
    userId: '',
    title: '',
    subtitle: '',
    description: '',
    details: '',
    type: '',
    unit: '',
    useCase: '',
    enabled: false,
    isBookmarked: false,
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    status: 0,
    media: [],
  }

  const addData = async (values: any) => {
    const JSONdata = JSON.stringify(values)
    const endpoint = 'https://xrealityapi.sinamn75.com/api/Product'
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
    console.log('result', result)

    if (result.status == 200) {
      productId = result.result.id.toString()
      showToast('success')
      //add media
      addDataMedia(values)
    }
    if (result.status == 401) showToast('error')
  }

  const addDataMedia = async (values: any) => {
    const formData = new FormData()

    formData.append('UserId', userId)
    formData.append('NotificationId', '')
    formData.append('ProductId', `${productId}`)
    formData.append('Visibility', '')
    formData.append('ContentId', '')
    formData.append('UseCase', 'Product')
    formData.append('UserId', userId)
    // upload list of files
    for (let i = 0; i <= values.media.length; i++) {
      formData.append('Files', values.media[i])
    }
    formData.append('Title', `${values.media.name}`)
    formData.append('CategoryId', '')

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
      router.push('/admin/content')
    }
    if (resultMedia.status == 401) showToast('error')
  }

  const onSubmit = async (values: any, e: any) => {
    addData(values)
  }

  const validationSchema = Yup.object({
    // userId: Yup.string(),
    title: Yup.string().required('لطفا نام محتوا را وارد کنید'),
    subtitle: Yup.string(),
    description: Yup.string(),
    details: Yup.string(),
    type: Yup.string(),
    unit: Yup.string(),
    useCase: Yup.string(),
    // enabled: Yup.boolean(),
    length: Yup.number().integer(),
    width: Yup.number().integer(),
    height: Yup.number().integer(),
    weight: Yup.number().integer(),
    // status: Yup.number().positive().integer(),
    media: Yup.array()
      .min(1, 'لطفا حداقل یک فایل آپلود کنید')
      .required('لطفا محتوا را آپلود کنید')
      .nullable(),
  })

  const handleDeleteFile = (idx: any) => {
    // setDeleteFile(idx)
    // console.log('DeleteFile', DeleteFile)

    var files_result = imageFiles
      .filter((file, index) => index !== idx)
      .map((file) => file)

    setImageFiles(files_result)
  }

  return (
    <>
      {session ? (
        <>
          <Toaster />
          <AdminLayout>
            <div className="px-8">
              <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                افزودن محتوا
              </h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formProps) => (
                  <Form
                    action="https://xrealityapi.sinamn75.com/api/Product"
                    method="POST"
                  >
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="grid grid-cols-6 gap-6 p-8">
                        {/* آپلود گالری تصاویر */}
                        <div className="group col-span-6 sm:col-span-2">
                          <label className="block text-sm fontmedium text-gray-700">
                            آپلود گالری تصاویر
                            <StarIcon className="w-2 h-2 text-red-500 inline" />
                          </label>
                          <div
                            className={`mt-1 flex justify-center px-6 py-10 border-2 border-gray-300 border-dashed rounded-md group-hover:bg-indigo-400 ${
                              Active == FILE_TYPES.gallery
                                ? 'bg-indigo-400 cursor-pointer'
                                : 'bg-gray-200 cursor-not-allowed'
                            }`}
                          >
                            <div
                              className="space-y-1 text-center"
                              onClick={() => {
                                setActive(FILE_TYPES.gallery)
                              }}
                            >
                              <ViewGridAddIcon className="mx-auto h-8 w-8 text-gray-300 group-hover:text-white" />
                              <div className="flex text-lg text-gray-600">
                                <label
                                  htmlFor="media"
                                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-nonefocus-within:ring-indigo-500"
                                >
                                  {Active == FILE_TYPES.gallery && (
                                    <>
                                      <span
                                        className={`group-hover:text-white ${
                                          Active == FILE_TYPES.gallery
                                            ? 'text-white'
                                            : ''
                                        }`}
                                      >
                                        آپلود گالری تصاویر
                                      </span>
                                      <input
                                        id="media"
                                        name="media"
                                        type="file"
                                        className="sr-only"
                                        accept="image/*"
                                        onChange={(e: any) => {
                                          //check format files
                                          changeHandler(e)

                                          const files = e.target.files
                                          let myFiles = Array.from(files)
                                          formProps.setFieldValue(
                                            'media',
                                            myFiles,
                                          )
                                        }}
                                        multiple
                                      />
                                    </>
                                  )}
                                </label>
                              </div>
                              <p className="text-xs text-gray-500 group-hover:text-indigo-800">
                                PNG, JPG, JPEG
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* آپلود ویدئو */}
                        <div
                          className="group col-span-6 sm:col-span-2"
                          onClick={() => {
                            setActive(FILE_TYPES.video)
                          }}
                        >
                          <label className="block text-sm fontmedium text-gray-700">
                            آپلود ویدئو
                            <StarIcon className="w-2 h-2 text-red-500 inline" />
                          </label>
                          <div
                            className={`mt-1 flex justify-center px-6 py-10 border-2 border-gray-300 border-dashed rounded-md group-hover:bg-indigo-400 ${
                              Active == FILE_TYPES.video
                                ? 'bg-indigo-400 cursor-pointer'
                                : 'bg-gray-200 cursor-not-allowed'
                            }`}
                          >
                            <div className="space-y-1 text-center">
                              <ViewGridAddIcon className="mx-auto h-8 w-8 text-gray-300 group-hover:text-white" />
                              <div className="flex text-lg text-gray-600">
                                <label
                                  htmlFor="media"
                                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-nonefocus-within:ring-indigo-500"
                                >
                                  {Active == FILE_TYPES.video && (
                                    <>
                                      <span className="group-hover:text-white">
                                        آپلود ویدئو
                                      </span>
                                      <input
                                        id="media"
                                        name="media"
                                        type="file"
                                        className="sr-only"
                                        multiple
                                        accept="video/*"
                                        onChange={(e) => {
                                          formProps.setFieldValue(
                                            'media',
                                            e.target.files,
                                          )
                                        }}
                                      />
                                    </>
                                  )}
                                </label>
                              </div>
                              <p className="text-xs text-gray-500 group-hover:text-indigo-800">
                                MP4, MKV
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* آپلود فایل سه بعدی */}
                        <div
                          className="group col-span-6 sm:col-span-2"
                          onClick={() => {
                            setActive(FILE_TYPES.object)
                          }}
                        >
                          <label className="block text-sm fontmedium text-gray-700">
                            آپلود فایل سه بعدی
                            <StarIcon className="w-2 h-2 text-red-500 inline" />
                          </label>
                          <div
                            className={`mt-1 flex justify-center px-6 py-10 border-2 border-gray-300 border-dashed rounded-md group-hover:bg-indigo-400 ${
                              Active == FILE_TYPES.object
                                ? 'bg-indigo-400 cursor-pointer'
                                : 'bg-gray-200 cursor-not-allowed'
                            }`}
                          >
                            <div className="space-y-1 text-center">
                              <ViewGridAddIcon className="mx-auto h-8 w-8 text-gray-300 group-hover:text-white" />
                              <div className="flex text-lg text-gray-600">
                                <label
                                  htmlFor="media"
                                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-nonefocus-within:ring-indigo-500"
                                >
                                  {Active == FILE_TYPES.object && (
                                    <>
                                      <span
                                        className={`group-hover:text-white ${
                                          Active == FILE_TYPES.object
                                            ? 'text-white'
                                            : ''
                                        }`}
                                      >
                                        آپلود فایل سه بعدی
                                      </span>
                                      <input
                                        id="media"
                                        name="media"
                                        type="file"
                                        className="sr-only"
                                        multiple
                                        onChange={(e) => {
                                          formProps.setFieldValue(
                                            'media',
                                            e.target.files,
                                          )
                                        }}
                                      />
                                    </>
                                  )}
                                </label>
                              </div>
                              <p className="text-xs text-gray-500 group-hover:text-indigo-800">
                                FBX, OBJ
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* نمایش محتواها */}
                        <div className="col-span-6 sm:col-span-6">
                          <ErrorMessage
                            name="media"
                            component="div"
                            className="text-red-500 text-right mt-1"
                          />
                          {images.length > 0 ? (
                            <div className="grid grid-cols-12 gap-4">
                              {images.map((image, idx: number) => {
                                return (
                                  <div key={idx}>
                                    <Image
                                      src={image}
                                      alt="preview"
                                      width={100}
                                      height={100}
                                      className="rounded-lg"
                                    />
                                    <XIcon
                                      className="w-6 h-6 bg-gray-200 text-indigo-600 rounded-lg p-1 cursor-pointer"
                                      onClick={() => {
                                        handleDeleteFile(idx)
                                      }}
                                    />
                                  </div>
                                )
                              })}
                            </div>
                          ) : null}
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
                          <ErrorMessage
                            name="subtitle"
                            component="div"
                            className="text-red-500 text-right mt-1"
                          />
                        </div>
                        {/* توضیحات */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            توضیحات
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="description"
                            name="description"
                            as="textarea"
                            placeholder="توضیحات"
                          />
                          <ErrorMessage
                            name="description"
                            component="div"
                            className="text-red-500 text-right mt-1"
                          />
                        </div>
                        {/* جزییات */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="details"
                            className="block text-sm font-medium text-gray-700"
                          >
                            جزییات
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="details"
                            name="details"
                            as="textarea"
                            placeholder="جزییات"
                          />
                          <ErrorMessage
                            name="details"
                            component="div"
                            className="text-red-500 text-right mt-1"
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
                          <ErrorMessage
                            name="type"
                            component="div"
                            className="text-red-500 text-right mt-1"
                          />
                        </div>
                        {/* واحد */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="unit"
                            className="block text-sm font-medium text-gray-700"
                          >
                            واحد
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="text"
                            id="unit"
                            name="unit"
                            placeholder="واحد"
                          />
                          <ErrorMessage
                            name="unit"
                            component="div"
                            className="text-red-500 text-right mt-1"
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
                          <ErrorMessage
                            name="useCase"
                            component="div"
                            className="text-red-500 text-right mt-1"
                          />
                        </div>
                        {/* فعال باشد */}
                        {/* <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="enabled"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            فعال باشد
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="checkbox"
                            id="enabled"
                            name="enabled"
                            component={SwitchToggle}
                            placeholder="وضعیت"
                          />
                        </div> */}
                        {/* طول */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="length"
                            className="block text-sm font-medium text-gray-700"
                          >
                            طول
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="number"
                            min="0"
                            id="length"
                            name="length"
                            placeholder="طول"
                          />
                          <ErrorMessage
                            name="length"
                            component="div"
                            className="text-red-500 text-right mt-1"
                          />
                        </div>
                        {/* عرض */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="width"
                            className="block text-sm font-medium text-gray-700"
                          >
                            عرض
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="number"
                            min="0"
                            id="width"
                            name="width"
                            placeholder="عرض"
                          />
                          <ErrorMessage
                            name="width"
                            component="div"
                            className="text-red-500 text-right mt-1"
                          />
                        </div>
                        {/* ارتفاع */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="height"
                            className="block text-sm font-medium text-gray-700"
                          >
                            ارتفاع
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="number"
                            min="0"
                            id="height"
                            name="height"
                            placeholder="ارتفاع"
                          />
                          <ErrorMessage
                            name="height"
                            component="div"
                            className="text-red-500 text-right mt-1"
                          />
                        </div>
                        {/* وزن */}
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="weight"
                            className="block text-sm font-medium text-gray-700"
                          >
                            وزن
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="number"
                            min="0"
                            id="weight"
                            name="weight"
                            placeholder="وزن"
                          />
                          <ErrorMessage
                            name="weight"
                            component="div"
                            className="text-red-500 text-right mt-1"
                          />
                        </div>
                        {/* وضعیت */}
                        {/* <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            وضعیت
                          </label>
                          <Field
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            type="checkbox"
                            id="status"
                            name="status"
                            component={SwitchToggle}
                            placeholder="وضعیت"
                          />
                        </div> */}
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        ارسال
                      </button>
                      <Link href="/admin/content">
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

export default AddContent

export async function getServerSideProps(context: NextApiResponse) {
  const session = await getSession(context)

  const getAllContent = async () => {
    const endpoint = 'https://xrealityapi.sinamn75.com/api/user'
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
