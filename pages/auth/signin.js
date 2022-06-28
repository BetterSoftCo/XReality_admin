import { useState } from 'react'
import { signIn, getCsrfToken } from 'next-auth/react'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { LockClosedIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'
import { useSession, getSession } from 'next-auth/react'

export default function SignIn() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isSendCode, setIsSendCode] = useState(false)
  const [token, setToken] = useState('')
  const [mobile, setMobile] = useState('')

  const { data: session, status } = useSession()

  //==========================getmobileforverification==========================

  const showToast = (type) => {
    if (type == 'success') {
      toast.success('کد تایید برای شما ارسال شد', {
        position: 'bottom-center',
      })
    } else if (type == 'error') {
      toast.error('خطا در ارسال فرم', {
        position: 'bottom-center',
      })
    }
  }

  const initialValues_verify = {
    mobile: '',
    sendSMS: false,
  }

  const onSubmit_verify = async (values) => {
    const JSONdata = JSON.stringify(values)

    const endpoint =
      'https://xrealityapi.sinamn75.com/api/user/GetMobileVerificationCodeForLogin'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    // console.log('result', result)

    if (result.status == 200) {
      showToast('success')
      setIsSendCode(true)
      setToken(result.result)
      setMobile(values.mobile)
    }
    if (result.status == 400) showToast('error')

    // console.log('form data', values)
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validationSchema_verify = Yup.object({
    mobile: Yup.string()
      .min(11, 'شماره موبایل معتبر وارد نمایید')
      .max(11, 'شماره موبایل معتبر وارد نمایید')
      .matches(phoneRegExp, 'شماره موبایل معتبر وارد نمایید')
      .required('شماره موبایل خود را وارد نمایید'),
  })

  // ===========================signin=================================

  const initialValues_signin = {
    mobile: '',
    verificationCode: '',
  }

  const validationSchema_signin = Yup.object({
    verificationCode: Yup.string()
      .min(4, 'کد تایید معتبر نمی باشد')
      .required('کد تایید را وارد نمایید'),
  })

  const onSubmit_signin = async (values, { setSubmitting }) => {
    values.mobile = mobile

    const res = await signIn('credentials', {
      redirect: false,
      mobile: values.mobile,
      verificationCode: values.verificationCode,
      callbackUrl: `${window.location.origin}/admin`,
    })

    // console.log(res)

    if (res?.error) {
      setError(res.error)
      showToast('error')
    } else {
      setError(null)
      showToast('success')
    }
    if (res.url) router.push(res.url)
    setSubmitting(false)
  }

  return (
    <>
      {!isSendCode ? (
        <>
          <Toaster />
          <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-md w-full space-y-8 bg-white p-5 rounded-lg">
              <div className="text-center">
                <Image
                  width={50}
                  height={50}
                  className="mx-auto w-auto"
                  src="/images/logo.png"
                  alt=""
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">
                  به XREALITY خوش آمدید
                </h2>
              </div>
              <Formik
                initialValues={initialValues_verify}
                validationSchema={validationSchema_verify}
                onSubmit={onSubmit_verify}
              >
                <Form
                  className="mt-8 space-y-6"
                  action="https://xrealityapi.sinamn75.com/api/user/GetMobileVerificationCodeForLogin"
                  method="POST"
                >
                  <label htmlFor="mobile">شماره موبایل خود را وارد کنید</label>
                  <Field
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-300 focus:border-gray-300 focus:z-10 sm:text-sm"
                    type="text"
                    id="mobile"
                    name="mobile"
                    placeholder="شماره موبایل"
                  />
                  <div>
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="text-red-500 text-right mt-1"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                          className="h-5 w-5 text-red-500 group-hover:text-red-400"
                          aria-hidden="true"
                        />
                      </span>
                      ارسال کد تایید
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </>
      ) : (
        <Formik
          initialValues={initialValues_signin}
          validationSchema={validationSchema_signin}
          onSubmit={onSubmit_signin}
        >
          <Form>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8 bg-white rounded-lg p-5">
                <div className="text-center">
                  <Image
                    width={50}
                    height={50}
                    className="mx-auto w-auto"
                    src="/images/logo.png"
                    alt=""
                  />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    کد تایید برای شما ارسال شد
                  </h2>

                  <div className="text-red-400 text-md text-center rounded p-2">
                    {error}
                  </div>
                  <label htmlFor="verificationCode" className="sr-only">
                    کد تایید را وارد کنید
                  </label>
                  <Field
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-300 focus:border-gray-300 focus:z-10 sm:text-sm mt-8"
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    placeholder="کد تایید"
                  />
                  <div>
                    <ErrorMessage
                      name="verificationCode"
                      component="div"
                      className="text-red-500 text-right mt-2"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-5"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon
                          className="h-5 w-5 text-red-500 group-hover:text-red-400"
                          aria-hidden="true"
                        />
                      </span>
                      ارسال
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      )}
    </>
  )
}

export async function getServerSideProps(context) {
  console.log('sessiio1 new ', await getSession(context))

  return {
    props: {
      session: await getSession(context),
    },
  }
}
