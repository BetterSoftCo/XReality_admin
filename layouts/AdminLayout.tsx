import { useRouter } from 'next/router'
import { Sidebar } from 'components/Sidebar'
import TopHeaderNotification from 'components/Header/TopHeaderNotification'

export default function AdminLayout({ children }: any) {
  const router = useRouter()
  return (
    <>
      <div className="w-full mx-auto mt-8 mb-12">
        <div className="flex justify-between items-start gap-4">
          <Sidebar />
          <div className="bg-white rounded-lg w-full p-6 relative">
            <TopHeaderNotification
              title="خرید نسخه حرفه ای"
              description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است."
            />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
