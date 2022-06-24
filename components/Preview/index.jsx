import Image from 'next/image'
import { useState } from 'react'

export function PreviewImage({ file }) {
  const [preview, setPreview] = useState(null)

  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    setPreview(reader.result)
  }
  return (
    <div>
      {preview && (
        <Image src={preview} alt="preview" width={500} height={250} />
      )}
    </div>
  )
}

export default PreviewImage
