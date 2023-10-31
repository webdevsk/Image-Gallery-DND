import { useState } from "react"
import Image from "./Image"

const imageFiles = Array.from({ length: 11 }).map((_, i) => {
  const c = i + 1
  return {
    id: `image${c}`,
    src: `/images/image-${c}.${c < 10 ? "webp" : "jpeg"}`,
  }
})
console.log(imageFiles)

const Gallery = () => {
  const [marked, setMarked] = useState([])
  return (
    <>
      <div className="rounded-xl border bg-gray-100 shadow-md">
        {/* title portion */}
        <div className="flex min-h-[2.5rem] items-center border-b px-4">
          <div>
            {!marked.length && <h5>Image Gallery</h5>}
            {!!marked.length && <h5>{marked.length} files selected</h5>}
          </div>
          <div className="ms-auto">
            {!!marked.length && (
              <button className="text-danger hover:text-danger-hover">
                <h6>Delete files</h6>
              </button>
            )}
          </div>
        </div>

        {/* body portion */}
        <div className="grid grid-cols-5 gap-2 p-4">
          {imageFiles.map((img) => (
            <Image key={img.id} image={img} featured={img.id === "image1"} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Gallery
