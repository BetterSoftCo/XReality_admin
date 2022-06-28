import AdminLayout from 'layouts/AdminLayout'
import { useSession, getSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function LibraryUser({ contents }: any) {
  const { data: session } = useSession()
  const router = useRouter()

  const showAlert = (contentId: string) => {
    Swal.fire({
      title: 'حذف محتوا',
      text: 'آیا اطمینان به حذف محتوا دارید؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34d399',
      cancelButtonColor: '#f87171',
      confirmButtonText: 'آره مطمئنم',
      cancelButtonText: 'حالا نه',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContent(contentId)
        Swal.fire({
          title: 'محتوا با موفقیت حذف شد',
          icon: 'success',
          confirmButtonText: 'حله',
        })
      }
    })
  }

  const deleteContent = async (contentId: string) => {
    console.log('contentId', contentId)

    const endpoint = `https://xrealityapi.sinamn75.com/api/Product/${contentId}`
    const options = {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    if (response.status == 200) {
      router.push('/admin/content')
    }
  }

  return (
    <>
      <AdminLayout>
        <div className="px-8">
          <div className="flex justify-between items-start">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-2xl text-indigo-800 font-medium mb-2">
                کتابخانه XREALITY
              </h2>
            </div>
          </div>
          {contents && <div>اطلاعات</div>}
        </div>
      </AdminLayout>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  const getAllContent = async () => {
    //TODO:
    const endpoint = 'https://xrealityapi.sinamn75.com/api/Media'
    const options = {
      method: 'GET',
      headers: {
        Accept: 'text/plain',
        // Authorization: `${session?.accessToken}`,
      },
    }
    const response = await fetch(endpoint, options)
    const contents = await response.json()
    if (!contents) {
      return {
        notFound: true,
      }
    }
    return contents
  }

  var contents = await getAllContent()

  return {
    props: {
      session,
      contents: contents.result,
    },
  }
}
