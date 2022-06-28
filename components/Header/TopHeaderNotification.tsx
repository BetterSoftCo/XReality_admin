import { BellIcon, XIcon } from '@heroicons/react/outline'
import { useState } from 'react'

const TopHeaderNotification = ({ title, description }: any) => {
  const [openNotify, setOpenNotify] = useState(true)

  return (
    <>
      {openNotify ? (
        <div
          className={`${
            openNotify ? 'animate-enter' : 'animate-leave'
          } relative w-full bg-gray-50 pointer-events-auto flex ring-1 ring-black ring-opacity-5 border border-gray-200 rounded-lg shadow-lg mb-8 `}
        >
          <button className="absolute p-0.5 bg-gray-100 border border-gray-300 rounded-full -top-1 -left-1">
            <XIcon
              className="w-4 h-4 bg-indigo-500 text-white rounded-xl"
              onClick={() => setOpenNotify(false)}
            />
          </button>
          <div className="flex items-center p-4">
            <span className="inline-block p-1 bg-indigo-200 rounded-xl">
              <BellIcon className="inline-block w-8 h-8 p-1 text-indigo-800 rounded-xl" />
            </span>

            <div className="mr-3 overflow-hidden">
              <p className="font-medium text-lg mb-1 text-gray-700">{title}</p>
              <p className="max-w-xs text-sm text-gray-600 truncate">
                {description}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default TopHeaderNotification
