import {
  ViewGridIcon,
  ArrowSmLeftIcon,
  CubeIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {
  return (
    <>
      <section className="h-full py-32 flex justify-center items-center bg-indigo-200">
        <div className="container m-auto px-4 sm:px-6 md:px-12">
          <div className="sm:pb-0 pb-4 flex justify-center mb-8">
            <a href="/admin" className="flex justify-center items-center">
              <span className="font-bold text-3xl ml-5 text-indigo-900">
                XREALITY
              </span>
              <Image
                width={50}
                height={50}
                className="mx-auto w-auto"
                src="/images/logo.png"
                alt=""
              />
            </a>
          </div>
          <div
            className="w-11/12 sm:w-full lg:w-8/12 m-auto relative
                        before:absolute before:top-8 before:left-0 before:right-0 before:w-full before:h-6 before:border-b before:border-t before:border-indigo-800 before:scale-x-110 sm:before:scale-x-105
                        after:absolute after:bottom-8 after:left-0 after:right-0 after:w-full after:h-6 after:border-b after:border-t after:border-indigo-800 after:scale-x-110 sm:after:scale-x-105"
          >
            <div className="md:w-8/12 m-auto flex  gap-4 sm:gap-6 text-lg font-medium text-indigo-200">
              <div className="w-2/6 h-52 sm:h-56 my-auto py-14 sm:border-l border-r  border-indigo-800">
                <div className="h-full flex justify-center items-center">
                  <span className="heading text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-indigo-500 text-7xl sm:text-9xl font-black">
                    4
                  </span>
                </div>
              </div>
              <div className="w-2/6 px-2 py-16 border-l border-r border-indigo-800">
                <div className="h-full py-4 flex justify-center items-center">
                  <span
                    role="hidden"
                    className="absolute block w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-indigo-500"
                  ></span>
                  <span
                    role="hidden"
                    className="block w-20 h-20 sm:w-32 sm:h-32  rounded-full bg-gradient-to-tr from-indigo-300 to-purple-400"
                  ></span>
                </div>
              </div>
              <div className="w-2/6 h-52 sm:h-56 my-auto py-14 border-l sm:border-r border-indigo-800">
                <div className="h-full flex justify-center items-center">
                  <span className="heading text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 to-purple-500 text-7xl sm:text-9xl font-black">
                    4
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 flex flex-col items-center justify-center">
            <div className="space-y-2 text-center">
              <h2 className="text-4xl font-bold text-indigo-700">
                صفحه یافت نشد
              </h2>
              <p className="text-gray-700">صفحه درخواستی شما یافت نشد...</p>
            </div>
            <Link href="/admin">
              <a className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                برگشت به صفحه اصلی
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound
