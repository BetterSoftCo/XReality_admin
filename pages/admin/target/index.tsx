import { PencilIcon, XIcon } from '@heroicons/react/outline'
import AdminLayout from 'layouts/AdminLayout'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
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

  const { data: session, status } = useSession()
  const router = useRouter()

  const handlePageChange = (page: number)=>{
    setCurrentPage(page)
  }

  const paginateTargets = paginate(targets, currentPage, pageSize)

  const showAlert = (targetId: string) => {
    Swal.fire({
      title: 'حذف تارگت',
      text: 'آیا اطمینان به حذف تارگت دارید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34d399',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'آره مطمئنم',
      cancelButtonText: 'حالا نه',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTarget(targetId)
        Swal.fire({
          title: 'تارگت با موفقیت حذف شد',
          icon: 'success',
          confirmButtonText: 'حله',
        })
      }
    })
  }

  const deleteMediaTarget = async (targetId: string) => {
    const endpoint = `https://xrealityapi.sinamn75.com/api/Media/${targetId}`
    const options = {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    console.log('response', response)

    if (response.status == 200) {
      router.push('/admin/target')
    }
  }

  const deleteTarget = async (targetId: string) => {
    //delete media first
    deleteMediaTarget(targetId)
    //delete data second
    //TODO: DELETE MEDIA AND TARGET

    // const endpoint = `https://xrealityapi.sinamn75.com/api/category/${targetId}`
    // const options = {
    //   method: 'DELETE',
    //   headers: {
    //     Accept: '*/*',
    //     Authorization: `${session?.accessToken}`,
    //   },
    // }
    // const response = await fetch(endpoint, options)
    // if (response.status == 200) {
    //   router.push('/admin/target')
    // }
  }

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
            <Pagination items={targets.length} currentPage={currentPage} pageSize={pageSize} onPageChange={handlePageChange} /> 
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
