import { BellIcon, MailIcon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Link from 'next/link'

const plans = [
  {
    message: 'پیام حقوقی دریافت شد',
    fromUser: 'مدیریت',
    role: 'فروش',
    date: '2 ساعت پیش',
  },
  {
    message: 'پیام حقوقی دریافت شد',
    fromUser: 'حسابدار',
    role: 'حسابدار',
    date: '3 ساعت پیش',
  },
  {
    message: 'پیام حقوقی دریافت شد',
    fromUser: 'مدیریت',
    role: 'مدیر',
    date: '4 ساعت پیش',
  },
]

const NotificationDropDown = () => {
  const [selected, setSelected] = useState(plans[0])
  return (
    <>
      <Menu as="div">
        <Menu.Button className="flex justify-center items-center">
          <span className="relative inline-block">
            <BellIcon
              className="w-9 h-9 p-1.5 border border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
              aria-hidden="true"
            />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-0.5 text-xs font-thin text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-800 rounded-full">
              9
            </span>
          </span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 w-80 mt-6 origin-center bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="px-1 py-1 divide-y divide-gray-200">
              {/* messages list */}
              <h4 className="text-indigo-800 font-normal border-b-0 p-3">
                پیام ها
              </h4>
              <ul>
                <Menu.Item>
                  <li className="flex items-center m-2 px-2 py-1 space-x-2 hover:bg-gray-100 rounded-lg">
                    <MailIcon className="w-6 text-gray-300 ml-4" />
                    <div className="flex flex-col">
                      <p className="mb-1">
                        <span className="text-xs text-indigo-500 font-normal">
                          پیام جدید
                        </span>{' '}
                        <span className="text-xs text-gray-500 font-thin">
                          از طرف مدیریت سیوان
                        </span>
                      </p>
                      <span className="text-xs text-gray-900 font-normal mb-2">
                        درخواست کاربری حقوقی تایید شد
                      </span>
                    </div>
                  </li>
                </Menu.Item>
                <Menu.Item>
                  <li className="flex items-center m-2 px-2 py-1 space-x-2 hover:bg-gray-100 rounded-lg">
                    <MailIcon className="w-7 text-indigo-300 ml-4" />
                    <div className="flex flex-col">
                      <p className="mb-1">
                        <span className="text-xs text-indigo-500 font-normal">
                          پیام جدید
                        </span>{' '}
                        <span className="text-xs text-gray-500 font-thin">
                          از طرف مدیریت سیوان
                        </span>
                      </p>
                      <span className="text-xs text-gray-900 font-normal mb-2">
                        درخواست کاربری حقوقی تایید شد
                      </span>
                    </div>
                  </li>
                </Menu.Item>
              </ul>
              <Link href="/profile/notifications">
                <a className="flex justify-center items-center w-full  px-4 py-2 bg-indigo-300 text-white hover:bg-indigo-400 rounded-lg">
                  مشاهده همه پیام ها
                </a>
              </Link>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default NotificationDropDown
