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

export function SidebarManager() {
  const [open, setOpen] = useState(true)
  const [submenuOpen, setsubmenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(0)

  const menus = [
    {
      id: 1,
      title: 'داشبورد',
      icon: <HomeIcon className="w-5 text-gray-400" />,
      href: '/admin/manager',
    },
    {
      id: 2,
      title: 'مدیریت کاربران',
      spacing: false,
      icon: <UserIcon className="w-5 text-gray-400" />,
      href: '/admin/manager/users',
    },
    {
      id: 3,
      title: 'مدیریت تیکت ها',
      submneu: false,
      icon: <StarIcon className="w-5 text-gray-400" />,
      href: '/admin/manager/chat',
    },
    {
      id: 4,
      title: 'مدیریت تاییدیه ها',
      submneu: false,
      icon: <StarIcon className="w-5 text-gray-400" />,
    },
    {
      id: 5,
      title: 'کتابخانه',
      submneu: true,
      submeunItems: [
        { id: 1, title: 'محتوا ها', href: '/admin/content' },
        { id: 2, title: 'افزودن محتوا', href: '/admin/content/add' },
      ],
      icon: <StarIcon className="w-5 text-gray-400" />,
    },
    {
      id: 6,
      title: 'مدیریت راهنما ',
      spacing: false,
      icon: <QuestionMarkCircleIcon className="w-5 text-gray-400" />,
      href: '/admin/manger/help',
    },
    {
      id: 7,
      title: 'مدیریت پکیج ها',
      spacing: true,
      submneu: false,
      icon: <MailIcon className="w-5 text-gray-400" />,
    },
    {
      id: 8,
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
            {menus.map((menu: any) => (
              <>
                <li
                  key={menu.id}
                  className={`text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-100 hover:text-white rounded-md mt-2 ${
                    menu.spacing ? 'mt-4' : 'mt-1'
                  }`}
                >
                  <span className="text-lg block float-right">
                    {menu.icon ? menu.icon : ''}
                  </span>
                  <span
                    className={`text-lg text-gray-600 font-normal flex-1 ${
                      !open && 'hidden'
                    }`}
                  >
                    <Link href={menu.href ? menu.href : ''} passHref>
                      <a
                        onClick={() => {
                          setsubmenuOpen(!submenuOpen)
                          setActiveSubmenu(menu.id)
                        }}
                      >
                        {menu.title}
                      </a>
                    </Link>
                  </span>
                  {menu.submneu && open && (
                    <ChevronDownIcon
                      className={`w-4 text-gray-500 ${
                        submenuOpen && 'rotate-z-180'
                      }`}
                      onClick={() => {
                        setsubmenuOpen(!submenuOpen)
                        setActiveSubmenu(menu.id)
                      }}
                    />
                  )}
                </li>
                {menu.submneu &&
                  submenuOpen &&
                  open &&
                  activeSubmenu == menu.id && (
                    <ul>
                      {menu.submeunItems.map((submneuItem: any) => (
                        <li
                          key={submneuItem.id}
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
