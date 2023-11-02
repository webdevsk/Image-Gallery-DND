import { forwardRef, useState } from "react"
import Image from "./Image"
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import {
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers"

// Slower method
// const generatedImages = Array.from({ length: 11 }).map((_, i) => {
//   const c = i + 1
//   return {
//     id: c,
//     src: `/images/image-${c}.${c < 10 ? "webp" : "jpeg"}`,
//   }
// })

const generatedImages = []
for (let i = 1; i < 12; i++) {
  generatedImages.push({
    id: i,
    src: `/images/image-${i}.${i < 10 ? "webp" : "jpeg"}`,
  })
}

const Gallery = () => {
  const [imageFiles, setImageFiles] = useState(generatedImages)
  const [marked, setMarked] = useState([])
  const [activeElm, setActiveElm] = useState(null)

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

  const handleDragStart = (data) => {
    setActiveElm(imageFiles.find((img) => img.id === data.active.id))
  }

  const handleDragOver = (data) => {
    console.log(data)
  }

  const handleDragEnd = (data) => {
    console.log(data)
    const { active, over, ...rest } = data
    if (!over) return
    if (active.id === over.id) return

    setImageFiles((imageFiles) => {
      const activeObj = imageFiles.find((img) => img.id === active.id)
      return imageFiles
        .toSpliced(
          imageFiles.findIndex((img) => img.id === active.id),
          1,
        )
        .toSpliced(
          imageFiles.findIndex((img) => img.id === over.id),
          0,
          activeObj,
        )
    })
    setActiveElm(null)
  }
  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext items={imageFiles}>
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
                    className="font-semibold text-danger hover:text-danger-hover"
                  >
                    <small>Delete files</small>
                  </button>
                )}
              </div>
            </div>

            {/* body portion */}
            <div
              className={`grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-5 `}
            >
              {imageFiles.map((img, i) => (
                <Image
                  key={img.id}
                  image={img}
                  featured={i === 0}
                  className="relative overflow-hidden rounded-lg border bg-white"
                  isMarked={marked.includes(img.id)}
                  handleMarked={handleMarked}
                />
              ))}

              {/* fake element to show on drag */}
              <DragOverlay
                modifiers={[restrictToWindowEdges]}
                zIndex={10}
                adjustScale={true}
                className="overflow-hidden rounded-lg border bg-white shadow-xl"
              >
                {!!activeElm && (
                  <img
                    className="aspect-square w-full object-contain"
                    src={activeElm.src}
                    alt={activeElm.id}
                  />
                )}
              </DragOverlay>

              {/* when there is no image */}
              {!imageFiles.length && (
                <h3 className="col-span-full select-none text-center text-gray-400">
                  No images available
                </h3>
              )}
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </>
  )
}

export default Gallery
