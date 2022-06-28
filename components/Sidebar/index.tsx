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
  const [activeSubmenu, setActiveSubmenu] = useState(0)
  const [activeColorMenu, setActiveColorMenu] = useState(0)

  const menus = [
    {
      id: 1,
      title: 'داشبورد',
      icon: <HomeIcon className="w-5 text-gray-400" />,
      href: '/admin',
    },
    {
      id: 2,
      title: 'پروفایل من',
      spacing: false,
      icon: <UserIcon className="w-5 text-gray-400" />,
      href: '/admin/profile',
    },
    {
      id: 3,
      title: 'تارگت های من',
      submneu: true,
      submeunItems: [
        { id: 1, title: 'تارگت ها', href: '/admin/target' },
        { id: 2, title: 'افزودن تارگت', href: '/admin/target/add' },
      ],
      icon: <StarIcon className="w-5 text-gray-400" />,
    },
    {
      id: 4,
      title: 'محتوا های من',
      submneu: true,
      submeunItems: [
        { id: 1, title: 'محتوا ها', href: '/admin/content' },
        { id: 2, title: 'افزودن محتوا', href: '/admin/content/add' },
      ],
      icon: <StarIcon className="w-5 text-gray-400" />,
    },
    {
      id: 5,
      title: 'کتابخانه XR',
      submneu: false,
      icon: <StarIcon className="w-5 text-gray-400" />,
      href: '/admin/library',
    },
    {
      id: 6,
      title: 'راهنما',
      spacing: false,
      icon: <QuestionMarkCircleIcon className="w-5 text-gray-400" />,
      href: '/admin/help',
    },
    {
      id: 7,
      title: 'چت',
      spacing: true,
      submneu: true,
      submeunItems: [
        { id: 1, title: 'چت ها', href: '/admin/chat' },
        { id: 2, title: 'چت جدید', href: '/admin/chat/add' },
      ],
      icon: <MailIcon className="w-5 text-gray-400" />,
    },
    {
      id: 8,
      title: 'نسخه حرفه ای',
      spacing: true,
      icon: <StarIcon className="w-5 text-gray-400" />,
      href: '/upgrade',
    },
    {
      id: 9,
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
          {/* TOGGLE ARROW */}
          <ArrowSmLeftIcon
            className={`bg-white text-indigo-600 w-8 rounded-full absolute -left-8 top-5 border border-gray-200 cursor-pointer z-40 ${
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
                  className={`text-gray-300 text-lg flex items-center gap-x-4 cursor-pointer p-2 rounded-md mt-2 ${
                    menu.spacing ? 'mt-4 ' : 'mt-1'
                  } ${
                    activeColorMenu == menu.id ? 'bg-gray-300' : 'bg-gray-100'
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
                      <a
                        onClick={() => {
                          setsubmenuOpen(!submenuOpen)
                          setActiveSubmenu(menu.id)
                          setActiveColorMenu(menu.id)
                        }}
                      >
                        {menu.title}
                      </a>
                    </Link>
                  </span>
                  {menu.submneu && open && (
                    <ChevronDownIcon
                      className={`w-4 text-gray-500 ${
                        submenuOpen &&
                        activeSubmenu == menu.id &&
                        'rotate-z-180'
                      }`}
                      onClick={() => {
                        setsubmenuOpen(!submenuOpen)
                        setActiveSubmenu(menu.id)
                        setActiveColorMenu(menu.id)
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
                          className="text-gray-500 text-lg flex items-center gap-x-4 cursor-pointer p-2 px-5 rounded-md"
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
