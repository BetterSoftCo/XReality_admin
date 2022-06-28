import AdminLayout from 'layouts/AdminLayout'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import TargetItem from 'components/Target/TargetItem'
import Pagination from 'components/Pagination'
import { useState } from 'react'
import { paginate } from 'utils/paginate'

type targetType = {
  id: string
  parentId: string
  title: string
  titleTr1: string
  subtitle: string
  link: string
  color: string
  useCase: string
  type: string
}

const Targets = ({ targets }: any) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 9

  // const router = useRouter()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const paginateTargets = paginate(targets, currentPage, pageSize)

  return (
    <>
      <AdminLayout>
        {targets && (
          <div className="px-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col justify-center items-center mb-4">
                <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                  تارگت ها
                </h2>
              </div>
              <Link href="/admin/target/add">
                <a className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  افزودن تارگت
                </a>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-x-3 gap-y-4">
              {paginateTargets.map((target: targetType) => (
                <TargetItem key={target.id} target={target} />
              ))}
            </div>
            <Pagination
              items={targets.length}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </AdminLayout>
    </>
  )
}

export default Targets

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  const getAllTarget = async () => {
    const endpoint = 'https://xrealityapi.sinamn75.com/api/category'
    const options = {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    const targets = await response.json()
    if (!targets) {
      return {
        notFound: true,
      }
    }
    return targets
  }

  var targets = await getAllTarget()

  return {
    props: {
      session,
      targets: targets.result,
    },
  }
}
