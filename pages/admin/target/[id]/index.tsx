import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import AdminLayout from 'layouts/AdminLayout'
import { NextApiResponse } from 'next'

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
                <Form
                  action="https://xrealityapi.sinamn75.com/api/Category"
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
                          value={target.title}
                        />
                      </div>
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
                          value={target.color}
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
                          value={target.useCase}
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
                          value={target.type}
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

export default TargetDetails

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  const { params, query } = context

  const endpoint = `https://xrealityapi.sinamn75.com/api/Category`
  // const endpoint = `https://xrealityapi.sinamn75.com/api/Category/${query.id}`
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
