import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Comment } from 'api/Comment'
import { NextPageContext } from 'next'

export interface CommentProps {
  commentsList?: Comment[]
}

export default function Comment({ commentsList }: CommentProps) {
  const router = useRouter()

  const [comments, setComments] = useState(commentsList)
  useEffect(() => {
    async function loadData() {
      const response = await fetch(
        'http://localhost:4001/vehicles?ownerName=' +
          router.query.person +
          '&vehicle=' +
          router.query.vehicle,
      )
      const commentsList: Comment[] | undefined = await response.json()
      setComments(commentsList)
    }

    if (commentsList?.length == 0) {
      loadData()
    }
  }, [])

  if (!comments?.[0]) {
    return <div>loading...</div>
  }

  // return <pre>{owners[0]?.details}</pre>
}

// interface CommnetNextPageContext extends NextPageContext {
//   query: {
//     comment: string
//   }
// }

Comment.getInitialProps = async ({ query, req }: NextPageContext) => {
  if (!req) {
    return { commentsList: [] }
  }

  const response = await fetch(
    'http://localhost:4001/vehicles?ownerName=' +
      query.person +
      '&vehicle=' +
      query.vehicle,
  )
  const commentsList: Comment[] | undefined = await response.json()
  return { commentsList: commentsList }
}
