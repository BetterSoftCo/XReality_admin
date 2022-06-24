export default function SkeletonElement({ type }: any) {
  return (
    <>
      <div
        className={`bg-gray-400 overflow-hidden mx-10 my-0 rounded-lg ${type}`}
      >
        <div>s</div>
      </div>
    </>
  )
}
