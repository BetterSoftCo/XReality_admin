import {
  BadgeCheckIcon,
  CubeIcon,
  MailIcon,
  ViewGridIcon,
} from '@heroicons/react/outline'

export function Statistics() {
  return (
    <>
      <div className="px-10">
        <p className="font-bold text-2xl text-indigo-800 mb-4">داشبورد</p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          {/* تارگت های من */}
          <div className="bg-blue-50 flex justify-between items-center p-6 rounded-lg shadow-sm">
            <div className="flex justify-start items-center gap-2">
              <ViewGridIcon className="w-8 h-8 text-blue-200" />
              <div>
                <p className="text-gray-700 font-thin text-lg">تارگت های من</p>
              </div>
            </div>
            <span className="font-bold text-3xl pr-2 text-blue-500">20</span>
          </div>
          {/* محتواهای من */}
          <div className="bg-green-50 flex justify-between items-center p-6 rounded-lg shadow-sm">
            <div className="flex justify-start items-center gap-2">
              <CubeIcon className="w-8 h-8 text-green-300" />
              <div>
                <p className="text-gray-700 font-thin text-lg">محتواهای من</p>
              </div>
            </div>
            <span className="font-bold text-3xl pr-2 text-green-500">30</span>
          </div>
          {/* تیکت های من */}
          <div className="bg-pink-50 flex justify-between items-center p-6 rounded-lg shadow-sm">
            <div className="flex justify-start items-center gap-2">
              <MailIcon className="w-8 h-8 text-pink-300" />
              <div>
                <p className="text-gray-700 font-thin text-lg">تیکت های من</p>
              </div>
            </div>
            <span className="font-bold text-3xl pr-2  text-pink-500">40</span>
          </div>
          {/* گالری عمومی */}
          <div className="bg-orange-50 flex justify-between items-center p-6 rounded-lg shadow-sm">
            <div className="flex justify-start items-center gap-2">
              <BadgeCheckIcon className="w-8 h-8 text-orange-300" />
              <div>
                <p className="text-gray-700 font-thin text-lg">گالری عمومی</p>
              </div>
            </div>
            <span className="font-bold text-3xl pr-2 text-orange-500">5</span>
          </div>
        </div>
      </div>
    </>
  )
}
