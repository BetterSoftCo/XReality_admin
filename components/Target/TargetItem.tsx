import {
  CameraIcon,
  CubeIcon,
  EyeIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { PencilIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import TargetItemPopup from './TargetItemPopup'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function TargetItem({ target }: any) {
  const { data: session, status } = useSession()

  const [pic, setPic] = useState('/images/default.jpg')
  let [isOpen, setIsOpen] = useState(true)

  const router = useRouter()

  useEffect(() => {
    //show image
    var picLink = target.media.map((media: any) => {
      return media.link
    })
    if (picLink[0]) {
      setPic(picLink[0])
    } else {
      setPic('/images/default.jpg')
    }
    //end show image
  })

  const deleteMediaTarget = async (targetId: string) => {
    const endpoint = `https://xrealityapi.sinamn75.com/api/Media/${targetId}`
    const options = {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `${session?.accessToken}`,
      },
    }
    //TODO: DELETE MEDIA FROM TARGET - BACKEND
    const response = await fetch(endpoint, options)
    console.log('response', response)

    if (response.status == 200) {
      router.push('/admin/target')
    }
  }

  const deleteTarget = async (targetId: string) => {
    //delete media first
    deleteMediaTarget(targetId)
    //delete data second
    //TODO: DELETE MEDIA AND TARGET BAKCEND

    // const endpoint = `https://xrealityapi.sinamn75.com/api/category/${targetId}`
    // const options = {
    //   method: 'DELETE',
    //   headers: {
    //     Accept: '*/*',
    //     Authorization: `${session?.accessToken}`,
    //   },
    // }
    // const response = await fetch(endpoint, options)
    // if (response.status == 200) {
    //   router.push('/admin/target')
    // }
  }

  const showAlert = (targetId: string) => {
    Swal.fire({
      title: 'حذف تارگت',
      text: 'آیا اطمینان به حذف تارگت دارید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34d399',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'آره مطمئنم',
      cancelButtonText: 'حالا نه',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTarget(targetId)
        Swal.fire({
          title: 'تارگت با موفقیت حذف شد',
          icon: 'success',
          confirmButtonText: 'حله',
        })
      }
    })
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="inline-block rounded-lg overflow-hidden">
        {/* BUTTONS */}
        <a href="" className="block p-4 rounded-lg border border-gray-200">
          <Image
            alt=""
            src={pic}
            width={500}
            height={400}
            className="w-full h-56 rounded-md"
          />
          <div className="mt-2">
            <dl>
              <div className="flex justify-between items-center">
                {/* عنوان */}
                <h3 className="font-medium text-2xl text-indigo-800">
                  {target.title}
                </h3>
                <div className="flex items-center">
                  {/* EDIT */}
                  <Link href={`/admin/target/${target.id}`} passHref>
                    <a className="z-20 block p-1.5 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring">
                      <PencilIcon className="w-4 h-4 text-green-600" />
                    </a>
                  </Link>
                  {/* VIEW */}
                  {/* <button
                    type="button"
                    className="z-20 block p-1.5 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
                    onClick={openModal}
                  >
                    <EyeIcon className="w-4 h-4 text-indigo-600" />
                  </button> */}
                  {/* DELETE */}
                  <button
                    className="z-30 block p-1.5 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                    type="button"
                  >
                    <XIcon
                      className="w-4 h-4 text-red-600"
                      onClick={(e: any) => {
                        showAlert(e.target.id)
                      }}
                    />
                  </button>
                </div>
              </div>
            </dl>
            <dl className="flex justify-around items-center gap-x-2 mt-6 text-xs">
              {/* گالری تصویر */}
              <div className="flex justify-between items-center gap-x-2">
                <CameraIcon className="w-5 h-5 text-gray-300" />
                <div className="sm:ml-3 mt-1.5 sm:mt-0">
                  <dt className="text-gray-500">تصویر</dt>
                  <dd className="font-medium">2</dd>
                </div>
              </div>
              {/* ویدئو */}
              <div className="flex justify-between items-center gap-x-2">
                <VideoCameraIcon className="w-5 h-5 text-gray-300" />
                <div className="sm:ml-3 mt-1.5 sm:mt-0">
                  <dt className="text-gray-500">ویدئو</dt>
                  <dd className="font-medium">2</dd>
                </div>
              </div>
              {/* سه بعدی */}
              <div className="flex justify-between items-center gap-x-2">
                <CubeIcon className="w-5 h-5 text-gray-300" />
                <div className="sm:ml-3 mt-1.5 sm:mt-0">
                  <dt className="text-gray-500">سه بعدی</dt>
                  <dd className="font-medium">4</dd>
                </div>
              </div>
            </dl>
          </div>
        </a>
      </div>
      {/* <TargetItemPopup
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      /> */}
    </>
  )
}
