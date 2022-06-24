import AdminLayout from 'layouts/AdminLayout'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Link from 'next/link'

const Help = (props: any) => {
  // const showToast = (type: string) => {
  //   if (type == 'success') {
  //     toast.success('فرم با موفقیت ارسال شد', {
  //       position: 'bottom-center',
  //     })
  //   } else if (type == 'error') {
  //     toast.error('خطا در ارسال فرم', {
  //       position: 'bottom-center',
  //     })
  //   }
  // }

  // const initialValues = {
  //   id: '',
  //   description: '',
  // }

  // const onSubmit = async (values: any) => {
  //   console.log(values)
  //   const JSONdata = JSON.stringify(values)

  //   const endpoint = 'https://localhost:3001/api/help'

  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSONdata,
  //   }

  //   const response = await fetch(endpoint, options)
  //   const result = await response.json()

  //   const res = await fetch(`https://localhost:3001/api/help/${result.id}`)

  //   if (res.status == 200) showToast('success')
  //   if (res.status == 400) showToast('error')

  //   // console.log('form data', values)
  // }

  // const validationSchema = Yup.object({
  //   description: Yup.string().required('لطفا توضیحات خود را وارد نمایید'),
  // })

  return (
    <>
      <AdminLayout>
        <div className="px-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                راهنما
              </h2>
            </div>
          </div>

          <div className=" overflow-hidden sm:rounded-md">
            <div className=" py-5 bg-white">
              <p>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
              {/* <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form
                  className=""
                  action="https://localhost:3001/api/help"
                  method="POST"
                >
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
                  <div>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-right mt-2"
                    />
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
              </Formik> */}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default Help
