import Image from 'next/image'

export default function UserChatItem({ chat }: any) {
  return (
    <>
      <div className="relative flex justify-center my-3">
        <h3 className="text-xs text-gray-400 z-10 relative bg-white px-3">
          دوشنبه 25 دی 1400
        </h3>
        <i className="absolute top-1/2 transform -translate-y-1/2 z-0 right-0 w-full flex border-t border-gray-400 border-opacity-10"></i>
      </div>

      <div className="flex lg:items-center flex-row-reverse">
        <div className="flex-shrink-0">
          <Image
            src="/images/avatar.svg"
            alt=""
            width={30}
            height={30}
            className="absolute rounded-xl bg-gray-100"
          />
        </div>
        <div className="w-1/2 py-2 px-6 rounded bg-gray-200 relative h-full lg:mr-5 ml-2">
          <p className="text-md text-gray-800 font-thin">{chat.messageText}</p>
        </div>
      </div>
    </>
  )
}
