import { CubeIcon, ViewGridIcon } from '@heroicons/react/outline'

export function Statistics({ targets, contents }: any) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 text-sm mt-8">
        {/* تارگت های من */}
        <div className="bg-blue-50 flex justify-between items-center p-6 rounded-lg shadow-sm">
          <div className="flex justify-start items-center gap-2">
            <ViewGridIcon className="w-8 h-8 text-blue-200" />
            <div>
              <p className="text-gray-700 font-thin text-lg">تارگت های من</p>
            </div>
          </div>
          <span className="font-bold text-3xl pr-2 text-blue-500">
            {targets}
          </span>
        </div>
        {/* محتواهای من */}
        <div className="bg-green-50 flex justify-between items-center p-6 rounded-lg shadow-sm">
          <div className="flex justify-start items-center gap-2">
            <CubeIcon className="w-8 h-8 text-green-300" />
            <div>
              <p className="text-gray-700 font-thin text-lg">محتواهای من</p>
            </div>
          </div>
          <span className="font-bold text-3xl pr-2 text-green-500">
            {contents}
          </span>
        </div>
      </div>
    </>
  )
}
