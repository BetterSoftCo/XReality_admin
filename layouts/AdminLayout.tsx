import { useRouter } from 'next/router'
import { Sidebar } from 'components/Sidebar'

export default function AdminLayout({ children }: any) {
  const router = useRouter()
  return (
    <>
      <div className="w-full mx-auto mt-8 mb-12">
        <div className="flex justify-between bg-indigo-200 items-start gap-4">
          <Sidebar />
          <div className="bg-white rounded-lg w-full p-6">{children}</div>
        </div>
      </div>
    </>
  )
}
