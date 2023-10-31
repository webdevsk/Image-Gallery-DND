import { useState } from "react"
import Image from "./Image"

const generatedImages = Array.from({ length: 11 }).map((_, i) => {
  const c = i + 1
  return {
    id: c,
    src: `/images/image-${c}.${c < 10 ? "webp" : "jpeg"}`,
  }
})

const Gallery = () => {
  const [imageFiles, setImageFiles] = useState(generatedImages)
  const [marked, setMarked] = useState([])

  const handleMarked = (id, bool) => {
    if (bool) {
      setMarked([...marked, id])
    } else {
      setMarked(marked.filter((item) => item !== id))
    }
  }

  const handleDelete = () => {
    if (!marked.length) return
    setImageFiles(imageFiles.filter((img) => !marked.includes(img.id)))
    setMarked([])
  }
  return (
    <>
      <div className="mx-auto max-w-[56rem] rounded-xl border bg-gray-100 shadow-md">
        {/* title portion */}
        <div className="flex min-h-[2.5rem] items-center border-b px-4">
          <div>
            {!marked.length && <h5>Image Gallery</h5>}
            {!!marked.length && <h6>{marked.length} files selected</h6>}
          </div>
          <div className="ms-auto">
            {!!marked.length && (
              <button
                onClick={handleDelete}
                className="text-danger hover:text-danger-hover font-semibold"
              >
                <small>Delete files</small>
              </button>
            )}
          </div>
        </div>

        {/* body portion */}
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-5">
          {imageFiles.map((img) => (
            <Image
              key={img.id}
              image={img}
              featured={img.id === 1}
              isMarked={marked.includes(img.id)}
              handleMarked={handleMarked}
            />
          ))}

          {!imageFiles.length && (
            <h3 className="col-span-full select-none text-center text-gray-400">
              No images available
            </h3>
          )}
        </div>
      </div>
    </>
  )
}

export default Gallery
