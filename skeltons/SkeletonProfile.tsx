import SkeletonElement from './SkeletonElement'

const SkeletonProfile = () => {
  return (
    <div className="mx-10 my-auto px-8 py-10">
      <div className="grid gap-5 items-center">
        <div>
          <SkeletonElement
            className="w-full h-full rounded-2xl"
            type="avatar"
          />
        </div>
        <div>
          <SkeletonElement className="w-50 h-10 mb-8" type="title" />
          <SkeletonElement className="w-full h-10" type="text" />
          <SkeletonElement className="w-full h-10" type="text" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonProfile
