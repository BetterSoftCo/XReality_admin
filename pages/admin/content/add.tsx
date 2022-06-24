import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import AdminLayout from 'layouts/AdminLayout'
import { NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import SwitchToggle from 'components/FormElement/SwitchToggle'

const AddContent = () => {
  const { data: session } = useSession()
  const [userId, setUserId] = useState('')
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
    // categories: [''],
  }

  const onSubmit = async (values: any, e: any) => {
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

    if (result.status == 200) {
      showToast('success')
      router.push('/admin/content')
    }
    if (result.status == 401) showToast('error')
  }

  const validationSchema = Yup.object({
    userId: Yup.string(),
    title: Yup.string(),
    subtitle: Yup.string(),
    description: Yup.string(),
    details: Yup.string(),
    type: Yup.string(),
    unit: Yup.string(),
    useCase: Yup.string(),
    enabled: Yup.boolean(),
    isBookmarked: Yup.boolean(),
    length: Yup.number().positive().integer(),
    width: Yup.number().positive().integer(),
    height: Yup.number().positive().integer(),
    weight: Yup.number().positive().integer(),
    status: Yup.number().positive().integer(),
    // categories: Yup.string(),
  })

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
                <Form
                  action="https://xrealityapi.sinamn75.com/api/Product"
                  method="POST"
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
                          placeholder="وضعیت"
                        />
                      </div>
                    </div>
                    Categorieesاضافه شود
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

  return {
    props: {
      session,
    },
  }
}
