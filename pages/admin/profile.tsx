import AdminLayout from 'layouts/AdminLayout'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import SelectField from 'components/FormElement/SelectField'

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
  id: string
  firstName: string
  lastName: string
  fullName: string
  bio: string
  headline: string
  website: string
  appUserName: string
  appPhoneNumber: string
  appEmail: string
  email: string
  birthDate: string
  genderId: number
}

const initialValues = {
  firstName: '',
  lastName: '',
  fullName: '',
  bio: '',
  headline: '',
  website: '',
  appUserName: '',
  appPhoneNumber: '',
  appEmail: '',
  email: '',
  birthDate: '',
  genderId: 0,
}

const onSubmit = async (values: any) => {
  console.log('values', values)

  // const JSONdata = JSON.stringify(values)
  // const endpoint = 'https://xrealityapi.sinamn75.com/api/user/UpdateProfile'
  // const options = {
  //   method: 'PUT',
  //   headers: {
  //     accept: 'text/plain',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSONdata,
  // }

  // const response = await fetch(endpoint, options)
  // const result = await response.json()

  // const res = await fetch(
  //   `https://xrealityapi.sinamn75.com/api/user/${result.id}`,
  // )

  // if (res.status == 200) showToast('success')
  // if (res.status == 400) showToast('error')
}

const validationSchema = Yup.object({
  firstName: Yup.string(),
  lastName: Yup.string(),
  fullName: Yup.string(),
  bio: Yup.string(),
  headline: Yup.string(),
  website: Yup.string(),
  appUserName: Yup.string(),
  appPhoneNumber: Yup.string(),
  appEmail: Yup.string(),
  email: Yup.string().email(),
  birthDate: Yup.date(),
})

export default function Profile({ user }: any) {
  const { data: session } = useSession()
  const [userId, setUserId] = useState('')
  const [text, setText] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    bio: '',
    headline: '',
    website: '',
    appUserName: '',
    appPhoneNumber: '',
    appEmail: '',
    email: '',
    birthDate: '',
    genderId: 0,
  })

  useEffect(() => {
    setUserId(session?.user?.id)
    setText({
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
      genderId: user.genderId,
    })
  }, [])

  const handleInputChange = (e: any) => {
    setText(e.target.value)
  }

  const showToast = (type: string) => {
    if (type == 'success') {
      toast.success('اطلاعات کاربر با موفقیت ویرایش شد', {
        position: 'bottom-center',
      })
    } else if (type == 'error') {
      toast.error('خطا در ارسال فرم', {
        position: 'bottom-center',
      })
    }
  }

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
                    action="https://xrealityapi.sinamn75.com/api/user/UpdateProfile"
                    method="PUT"
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
                              value={text.firstName}
                              onChange={(e: any) => handleInputChange(e)}
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
                              value={text.lastName}
                              onChange={(e: any) => handleInputChange(e)}
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
                              value={text.fullName}
                              onChange={(e: any) => handleInputChange(e)}
                            />
                          </div>
                          {/* جنسیت */}
                          <div className="col-span-6 sm:col-span-3">
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
                          </div>
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
                              value={text.headline}
                              onChange={(e: any) => handleInputChange(e)}
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
                              value={text.website}
                              onChange={(e: any) => handleInputChange(e)}
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
                              value={text.appUserName}
                              onChange={(e: any) => handleInputChange(e)}
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
                              disabled
                              placeholder="شماره موبایل اپلیکیشن"
                              value={text.appPhoneNumber}
                              onChange={(e: any) => handleInputChange(e)}
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
                              value={text.appEmail}
                              onChange={(e: any) => handleInputChange(e)}
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
                              value={text.appEmail}
                              onChange={(e: any) => handleInputChange(e)}
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
                              value={text.birthDate}
                              onChange={(e: any) => handleInputChange(e)}
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
                              value={text.bio}
                              onChange={(e: any) => handleInputChange(e)}
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

  const response = await fetch(
    `https://xrealityapi.sinamn75.com/api/user/${session?.user?.id}`,
  )
  const user_data = await response.json()

  return {
    props: {
      user: user_data.result,
    },
  }
}
