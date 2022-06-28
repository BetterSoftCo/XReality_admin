import { useRouter } from 'next/router'
import { SidebarManager } from 'components/Sidebar/SidebarManager'

export default function ManagerLayout({ children }: any) {
  const router = useRouter()
  return (
    <>
      <div className="w-full mx-auto mt-8 mb-12">
        <div className="flex justify-between items-start gap-4">
          <SidebarManager />
          <div className="bg-white rounded-lg w-full p-6">{children}</div>
        </div>
      </div>
    </>
  )
}
