import { CheckIcon, StarIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'

export function UpgradePackageItem({ item }: any) {
  return (
    <>
      <div className="bg-white rouned-lg border-2 border-gray-200 p-8 rounded-xl hover:border-gray-400">
        <div className="flex justify-between items-center border-b pb-3 mb-5">
          <div className="flex items-center">
            {/* <StarIcon className="w-6 h-6 text-indigo-200 ml-3" /> */}
            <p className="font-medium text-2xl text-gray-400">
              {item.packageName}
            </p>
          </div>
        </div>
        <h4 className="font-bold text-right text-red-500 text-4xl mb-3">
          {item.price} <span className="text-gray-500 mr-2">تومان</span>
        </h4>
        <p className="text-gray-500  text-right font-thin">
          به ازای مصرف ماهانه
        </p>

        <Link href="">
          <a className="w-full inline-flex justify-center rounded-xl border border-indigo-500 shadow-sm px-4 py-2 text-white bg-indigo-500 text-sm text-white-600 hover:bg-border-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-100 focus:ring-indigo-300 font-normal my-6">
            رایگان شروع کنید
          </a>
        </Link>
        <ul>
          {item.items.map((item: any) => (
            <li key={item.id} className="flex items-center mb-2">
              {item.isIncluded ? (
                <CheckIcon className="h-4 w-4 p-0.5 bg-green-100 rounded-full text-green-400" />
              ) : (
                <XIcon className="h-4 w-4 p-0.5 bg-red-100 rounded-full text-red-400" />
              )}
              <p className="text-gray-600 mr-2 text-right">{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
