import { SearchIcon } from '@heroicons/react/outline'
import { useSession, getSession } from 'next-auth/react'
import ManagerLayout from 'layouts/ManagerLayout'
import UserChatItem from 'components/Chat/UserChatItem'

type chatType = {
  id: ''
  userId: ''
  messageText: ''
  fullName: ''
  dateTime: ''
  profileImage: ''
  send: false
}

export default function ChatUserDetails({ chats }: any) {
  return (
    <>
      <ManagerLayout>
        <div className="px-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-2xl text-indigo-800 font-medium mb-4">
                مدیریت تیکت ها
              </h2>
            </div>
          </div>
          <ul>
            {/* SEARCH BOX */}
            <div className="mb-5 flex rounded-md shadow-sm bg-indigo-500">
              <input
                type="text"
                name="search"
                id="search"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 text-right directionLtr"
                placeholder="جستجو کنید..."
              />
              <div className="flex justify-center items-center w-10 h-10">
                <SearchIcon className="w-5 h-5 text-indigo-100" />
              </div>
            </div>
            {chats.map((chat: any) => (
              <UserChatItem key={chat.id} chat={chat} />
            ))}
          </ul>
        </div>
      </ManagerLayout>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  const { query } = context
  console.log('query', query)

  const getAllChatsUser = async () => {
    const endpoint = `https://xrealityapi.sinamn75.com/api/Chat/${query.id}`
    const options = {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    const chats = await response.json()
    if (!chats) {
      return {
        notFound: true,
      }
    }
    console.log('chats', chats)

    return chats
  }

  var chats = await getAllChatsUser()

  return {
    props: {
      session,
      chats: chats.result,
    },
  }
}
