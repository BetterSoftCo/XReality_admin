import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import AdminLayout from 'layouts/AdminLayout'

const Add_Chat = () => {
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
    userId: '',
    messageText: '',
  }

  const onSubmit = async (values: any, e: any) => {
    values.userId = userId

    const JSONdata = JSON.stringify(values)
    const endpoint = 'https://xrealityapi.sinamn75.com/api/chat'
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
    }
    if (result.status == 401) showToast('error')
  }

  const validationSchema = Yup.object({
    userId: Yup.string(),
    messageText: Yup.string().required('لطفا متن پیام را وارد نمایید'),
  })

  return (
    <>
      {session ? (
        <>
          <Toaster />
          <AdminLayout>
            <div className="px-8">
              <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                تیکت جدید
              </h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form
                  action="https://xrealityapi.sinamn75.com/api/chat"
                  method="POST"
                >
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <label
                        htmlFor="messageText"
                        className="block text-sm font-medium text-gray-700"
                      >
                        متن پیام
                      </label>
                      <Field
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        type="text"
                        as="textarea"
                        id="messageText"
                        name="messageText"
                        placeholder="متن پیام"
                      />
                      <div>
                        <ErrorMessage
                          name="messageText"
                          component="div"
                          className="text-red-500 text-right mt-1"
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
                    <Link href="/admin/chats">
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

export default Add_Chat

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
