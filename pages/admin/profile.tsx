import AdminLayout from 'layouts/AdminLayout'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

const gender_options = [
  {
    value: 0,
    label: 'مرد',
  },
  {
    value: 1,
    label: 'زن',
  },
]

interface ISelectInput {
  id: number
  name: string
}

type userType = {
  phoneNumber: string
  userName: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  bio: string
  headline: string
  website: string
  appUserName: string
  appPhoneNumber: string
  appEmail: string
  type: string
  region: string
  activity: string
  suspend: string
  wallet: 0
  showContactInfo: string
  birthDate: string
  genderId: 0
}

export default function Profile({ user }: any) {
  const { data: session } = useSession()
  const [userId, setUserId] = useState('')

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    bio: user.bio,
    headline: user.headline,
    website: user.website,
    appUserName: user.appUserName,
    appPhoneNumber: user.appPhoneNumber,
    appEmail: user.appEmail,
    email: user.email,
    birthDate: user.birthDate,
    // genderId: 0,
  }

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

  const onSubmit = async (values: any) => {
    console.log('values', values)

    const JSONdata = JSON.stringify(values)
    const endpoint = 'https://xrealityapi.sinamn75.com/api/user/UpdateProfile'
    const options = {
      method: 'PUT',
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()

    const res = await fetch(
      `https://xrealityapi.sinamn75.com/api/user/${result.id}`,
    )

    if (res.status == 200) showToast('success')
    if (res.status == 400) showToast('error')
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().nullable(),
    lastName: Yup.string().nullable(),
    fullName: Yup.string().nullable(),
    bio: Yup.string().nullable(),
    headline: Yup.string().nullable(),
    website: Yup.string().nullable(),
    appUserName: Yup.string(),
    appPhoneNumber: Yup.string().nullable(),
    appEmail: Yup.string().email('لطفا ایمیل معتبر وارد کنید').nullable(),
    email: Yup.string().email('لطفا ایمیل معتبر وارد کنید').nullable(),
    birthDate: Yup.string().nullable(),
  })

  useEffect(() => {
    setUserId(session?.user?.id)
  }, [])

  // const handleReset = (resetForm: any) => {
  //   if (window.confirm('Reset?')) {
  //     resetForm()
  //   }
  // }

  return (
    <>
      {session ? (
        <>
          <Toaster />
          <AdminLayout>
            <div className="px-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col justify-center items-start">
                  <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                    نام کاربری : {user.userName}
                  </h2>
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formProps) => (
                  <Form
                  // action="https://xrealityapi.sinamn75.com/api/user/UpdateProfile"
                  // method="PUT"
                  >
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          {/* نام */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="firstName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              نام
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              type="text"
                              id="firstName"
                              name="firstName"
                              placeholder="نام"
                              value={initialValues.firstName}
                              // onChange={(e: any) => {
                              //   formProps.setFieldValue(
                              //     'firstName',
                              //     e.target.values,
                              //   )
                              // }}
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                          {/* نام خانوادگی */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="lastName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              نام خانوادگی
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              type="text"
                              id="lastName"
                              name="lastName"
                              placeholder="نام خانوادگی"
                              value={initialValues.lastName}
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                          {/* نام کامل */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="fullName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              نام کامل
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              type="text"
                              id="fullName"
                              name="fullName"
                              placeholder="نام کامل"
                              value={initialValues.fullName}
                            />
                            <ErrorMessage
                              name="fullName"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                          {/* جنسیت */}
                          {/* <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="genderId"
                              className="block text-sm font-medium text-gray-700"
                            >
                              جنسیت
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              as="select"
                              type="text"
                              name="genderId"
                              component={SelectField}
                              options={gender_options}
                            />
                          </div> */}
                          {/* عنوان */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="headline"
                              className="block text-sm font-medium text-gray-700"
                            >
                              عنوان
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              type="text"
                              id="headline"
                              name="headline"
                              placeholder="عنوان"
                              value={initialValues.headline}
                            />
                            <ErrorMessage
                              name="headline"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                          {/* وب سایت */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="website"
                              className="block text-sm font-medium text-gray-700"
                            >
                              وب سایت
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              type="text"
                              id="website"
                              name="website"
                              placeholder="وب سایت"
                              value={initialValues.website}
                            />
                            <ErrorMessage
                              name="website"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                          {/*  نام کاربری اپلیکیشن */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="appUserName"
                              className="block text-sm font-medium text-gray-700"
                            >
                              نام کاربری اپلیکیشن
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200"
                              type="text"
                              id="appUserName"
                              name="appUserName"
                              placeholder="نام کاربری اپلیکیشن"
                              disabled
                              value={initialValues.appUserName}
                            />
                            <ErrorMessage
                              name="appUserName"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                          {/* شماره موبایل اپلیکیشن */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="appPhoneNumber"
                              className="block text-sm font-medium text-gray-700"
                            >
                              شماره موبایل اپلیکیشن
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-200"
                              type="text"
                              id="appPhoneNumber"
                              name="appPhoneNumber"
                              // disabled
                              placeholder="شماره موبایل اپلیکیشن"
                              value={initialValues.appPhoneNumber}
                              // onChange={(e: any) => {
                              //   formProps.setFieldValue(
                              //     'appPhoneNumber',
                              //     e.target.value,
                              //   )
                              // }}
                            />
                            <ErrorMessage
                              name="appPhoneNumber"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                          {/* ایمیل اپلیکیشن */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="appEmail"
                              className="block text-sm font-medium text-gray-700"
                            >
                              ایمیل اپلیکیشن
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              type="text"
                              id="appEmail"
                              name="appEmail"
                              placeholder="ایمیل اپلیکیشن"
                              value={initialValues.appEmail}
                            />
                            <ErrorMessage
                              name="appEmail"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                          {/* ایمیل */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              ایمیل
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              type="text"
                              id="email"
                              name="email"
                              placeholder="ایمیل"
                              value={initialValues.email}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                          {/* تاریخ تولد */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="birthDate"
                              className="block text-sm font-medium text-gray-700"
                            >
                              تاریخ تولد
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              type="text"
                              id="birthDate"
                              name="birthDate"
                              placeholder="تاریخ تولد"
                              value={initialValues.birthDate}
                            />
                            <ErrorMessage
                              name="birthDate"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                          {/* بیوگرافی */}
                          <div className="col-span-6 sm:col-span-3">
                            <label
                              htmlFor="bio"
                              className="block text-sm font-medium text-gray-700"
                            >
                              بیوگرافی
                            </label>
                            <Field
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              as="textarea"
                              type="text"
                              id="bio"
                              name="bio"
                              placeholder="بیوگرافی"
                              value={initialValues.bio}
                            />
                            <ErrorMessage
                              name="bio"
                              component="div"
                              className="text-red-500 text-right mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // onClick={handleReset.bind(null, formProps.resetForm)}
                      >
                        ذخیره
                      </button>
                      <Link href="/admin">
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

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  console.log('session',session);

  const response = await fetch(
    `https://xrealityapi.sinamn75.com/api/user`,
  )
  const user = await response.json()

  return {
    props: {
      user: user.result,
    },
  }
}
