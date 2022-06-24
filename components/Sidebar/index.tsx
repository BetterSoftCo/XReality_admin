import {
  HomeIcon,
  MailIcon,
  UserIcon,
  LogoutIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  ArrowSmLeftIcon,
  ChevronDownIcon,
} from '@heroicons/react/outline'
import { useState } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export function Sidebar() {
  const [open, setOpen] = useState(true)
  const [submenuOpen, setsubmenuOpen] = useState(false)

  const menus = [
    {
      title: 'داشبورد',
      icon: <HomeIcon className="w-5 text-gray-400" />,
      href: '/admin',
    },
    {
      title: 'پروفایل من',
      spacing: false,
      icon: <UserIcon className="w-5 text-gray-400" />,
      href: '/admin/profile',
    },
    {
      title: 'تارگت های من',
      submneu: true,
      submeunItems: [
        { title: 'تارگت ها', href: '/admin/target' },
        { title: 'افزودن تارگت', href: '/admin/target/add' },
      ],
      icon: <StarIcon className="w-5 text-gray-400" />,
    },
    {
      title: 'محتوا های من',
      submneu: true,
      submeunItems: [
        { title: 'محتوا ها', href: '/admin/content' },
        { title: 'افزودن محتوا', href: '/admin/content/add' },
      ],
      icon: <StarIcon className="w-5 text-gray-400" />,
    },
    {
      title: 'راهنما',
      spacing: false,
      icon: <QuestionMarkCircleIcon className="w-5 text-gray-400" />,
      href: '/admin/help',
    },
    {
      title: 'چت',
      spacing: true,
      submneu: true,
      submeunItems: [
        { title: 'چت ها', href: '/admin/chat' },
        { title: 'چت جدید', href: '/admin/chat/add' },
      ],
      icon: <MailIcon className="w-5 text-gray-400" />,
    },
    {
      title: 'نسخه حرفه ای',
      spacing: true,
      icon: <StarIcon className="w-5 text-gray-400" />,
      href: '/upgrade',
    },
    {
      title: '',
      icon: (
        <LogoutIcon
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}/auth/signin`,
            })
          }
          className="w-5 text-red-400"
        />
      ),
    },
  ]

  return (
    <>
      <div className="flex">
        <div
          className={`h-screen p-5 pt-8 ${
            open ? 'w-64' : 'w-16'
          } duration-300 relative`}
        >
          <ArrowSmLeftIcon
            className={`bg-white text-indigo-600 w-8 rounded-full absolute -left-8 top-5 border border-gray-200 cursor-pointer ${
              !open && 'rotate-y-180'
            }`}
            onClick={() => setOpen(!open)}
          />
          <div className="inline-flex">
            <Image
              width={35}
              height={35}
              src="/images/logo.png"
              alt=""
              className={`text-2xl p-2 rounded cursor-pointer block float-right ml-2 duration-500 ${
                open && 'rotate-z-360'
              }`}
            />
            <h3
              className={`text-red-500 origin-right mr-4 font-medium text-2xl duration-300 ${
                !open && 'scale-x-0'
              }`}
            >
              XREALITY
            </h3>
          </div>

          <ul className="pt-2">
            {menus.map((menu, index) => (
              <>
                <li
                  key={index}
                  className={`text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-100 hover:text-white rounded-md mt-2 ${
                    menu.spacing ? 'mt-4' : 'mt-1'
                  }`}
                >
                  <span className="text-lg block float-right">
                    {menu.icon ? (
                      menu.icon
                    ) : (
                      <StarIcon className="text-lg text-gray-600" />
                    )}
                  </span>
                  <span
                    className={`text-lg text-gray-600 font-normal flex-1 ${
                      !open && 'hidden'
                    }`}
                  >
                    <Link href={menu.href ? menu.href : ''} passHref>
                      <a> {menu.title}</a>
                    </Link>
                  </span>
                  {menu.submneu && open && (
                    <ChevronDownIcon
                      className={`w-4 text-gray-500 ${
                        submenuOpen && 'rotate-z-180'
                      }`}
                      onClick={() => setsubmenuOpen(!submenuOpen)}
                    />
                  )}
                </li>
                {menu.submneu && submenuOpen && open && (
                  <ul>
                    {menu.submeunItems.map((submneuItem, index) => (
                      <li
                        key={index}
                        className="text-gray-500 text-lg flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-gray-300 rounded-md"
                      >
                        <Link href={submneuItem.href} passHref>
                          <a>{submneuItem.title}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
