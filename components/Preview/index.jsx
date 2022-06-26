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
        <Image
          src={preview}
          alt="preview"
          width={80}
          height={80}
          className="rounded-lg"
        />
      )}
    </div>
  )
}

export default PreviewImage
