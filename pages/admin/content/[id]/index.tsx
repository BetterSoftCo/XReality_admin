import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import AdminLayout from 'layouts/AdminLayout'
import SwitchToggle from 'components/FormElement/SwitchToggle'
import Swal from 'sweetalert2'

const ContentDetails = ({ content }: any) => {
  const { data: session } = useSession()
  const [userId, setUserId] = useState('')
  const [text, setText] = useState({
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
  })

  useEffect(() => {
    setUserId(session?.user?.id)
    setText({
      title: content.title,
      subtitle: content.subtitle,
      description: content.description,
      details: content.details,
      type: content.type,
      unit: content.unit,
      useCase: content.useCase,
      enabled: content.enabled,
      isBookmarked: content.isBookmarked,
      length: content.length,
      width: content.width,
      height: content.height,
      weight: content.weight,
      status: content.status,
    })
  }, [])

  const handleInputChange = (e: any) => {
    setText(e.target.value)
  }

  const router = useRouter()

  const showToast = (type: string) => {
    if (type == 'success') {
      toast.success('اطلاعات با موفقیت ویرایش شد', {
        position: 'bottom-center',
      })
    } else if (type == 'error') {
      toast.error('خطا در ویرایش اطلاعات', {
        position: 'bottom-center',
      })
    }
  }

  const initialValues = {
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
    // categories: [''],
  }

  const onSubmit = async (values: any, e: any) => {
    const JSONdata = JSON.stringify(values)
    const endpoint = 'https://xrealityapi.sinamn75.com/api/Product'
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
      console.log('result', result)

      showToast('success')
    }
    if (result.status == 401) showToast('error')
  }

  const validationSchema = Yup.object({
    title: Yup.string(),
    subtitle: Yup.string(),
    description: Yup.string(),
    details: Yup.string(),
    type: Yup.string(),
    unit: Yup.string(),
    useCase: Yup.string(),
    enabled: Yup.boolean(),
    isBookmarked: Yup.boolean(),
    length: Yup.number(),
    width: Yup.number(),
    height: Yup.number(),
    weight: Yup.number(),
    status: Yup.number(),
    // categories: Yup.string(),
  })

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
      {session ? (
        <>
          <Toaster />
          <AdminLayout>
            <div className="px-8">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                  محتوا: {content.title}
                </h2>
                <button
                  className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => showAlert(content.id)}
                >
                  حذف
                </button>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form
                  action="https://xrealityapi.sinamn75.com/api/Product"
                  method="PUT"
                >
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="grid grid-cols-6 gap-6 p-8">
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
                          value={text.title}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
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
                          value={text.subtitle}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
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
                          placeholder="توضیحات"
                          value={text.description}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
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
                          placeholder="جزییات"
                          value={text.details}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
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
                          value={text.type}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
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
                          value={text.unit}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
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
                          value={text.useCase}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
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
                          value={text.enabled}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="visitsCount"
                          className="block text-sm font-medium text-gray-700"
                        >
                          تعداد بازدید
                        </label>
                        <Field
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          type="number"
                          id="visitsCount"
                          name="visitsCount"
                          placeholder="تعداد بازدید"
                          value={text.visitsCount}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="length"
                          className="block text-sm font-medium text-gray-700"
                        >
                          طول
                        </label>
                        <Field
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          type="text"
                          id="length"
                          name="length"
                          placeholder="طول"
                          value={text.length}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="width"
                          className="block text-sm font-medium text-gray-700"
                        >
                          عرض
                        </label>
                        <Field
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          type="text"
                          id="width"
                          name="width"
                          placeholder="عرض"
                          value={text.width}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="height"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ارتفاع
                        </label>
                        <Field
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          type="text"
                          id="height"
                          name="height"
                          placeholder="ارتفاع"
                          value={text.height}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="weight"
                          className="block text-sm font-medium text-gray-700"
                        >
                          وزن
                        </label>
                        <Field
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          type="text"
                          id="weight"
                          name="weight"
                          placeholder="وزن"
                          value={text.weight}
                          onChange={(e: any) => handleInputChange(e)}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
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
                          checked={content.status}
                          placeholder="وضعیت"
                        />
                      </div>
                    </div>
                    اپلود عکس تارگت اضافه شود
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

export default ContentDetails

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  const { query } = context

  const endpoint = `https://xrealityapi.sinamn75.com/api/Product/${query.id}`
  const options = {
    method: 'GET',
    headers: {
      Accept: 'text/plain',
      Authorization: `${session?.accessToken}`,
    },
  }
  const response = await fetch(endpoint, options)
  const content = await response.json()
  if (!content) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      session,
      content: content.result,
    },
  }
}
