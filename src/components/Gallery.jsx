import { useState } from "react"
import Image from "./Image"
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import generatedImages from "../assets/generatedImages"
import AddNewImage from "./AddNewImage"
import GalleryTitle from "./GalleryTitle"
import GalleryFooter from "./GalleryFooter"
import ImageBox from "./ImageBox"

const Gallery = () => {
  const [imageFiles, setImageFiles] = useState(generatedImages)
  const [marked, setMarked] = useState([])
  // for drag overlay
  const [activeElm, setActiveElm] = useState(null)
  // for image box
  const [imgBoxElm, setImgBoxElm] = useState(null)
  // handler functions
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleFeatured = (id) => {
    setImageFiles((imageFiles) => {
      const activeFile = imageFiles.find((img) => img.id === id)
      return imageFiles
        .toSpliced(
          imageFiles.findIndex((img) => img.id === id),
          1,
        )
        .toSpliced(0, 0, activeFile)
    })
  }

  const handleMarked = (id, bool) =>
    setMarked(bool ? [...marked, id] : marked.filter((item) => item !== id))

  const handleMarkAll = () => setMarked(imageFiles.map((img) => img.id))
  const handleUnmarkAll = () => setMarked([])

  const handleDelete = () => {
    if (!marked.length) return
    setImageFiles(imageFiles.filter((img) => !marked.includes(img.id)))
    setMarked([])
  }

  const handleDragStart = (data) =>
    setActiveElm(imageFiles.find((img) => img.id === data.active.id))

  const handleDragEnd = (data) => {
    const { active, over } = data
    if (!over) return
    if (active.id === over.id) return

    setImageFiles((imageFiles) => {
      const activeFile = imageFiles.find((img) => img.id === active.id)
      return imageFiles
        .toSpliced(
          imageFiles.findIndex((img) => img.id === active.id),
          1,
        )
        .toSpliced(
          imageFiles.findIndex((img) => img.id === over.id),
          0,
          activeFile,
        )
    })
    setActiveElm(null)
  }

  const handleDragCancel = () => setActiveElm(null)

  return (
    <>
      <div className="relative mx-auto max-w-[56rem] rounded-xl border bg-gradient-to-b from-gray-100 from-0% to-gray-200 to-100% shadow-lg">
        {/* title portion */}
        <GalleryTitle
          marked={marked}
          imageFiles={imageFiles}
          handleMarkAll={handleMarkAll}
          handleUnmarkAll={handleUnmarkAll}
          handleDelete={handleDelete}
        />

        {/* body portion */}
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          collisionDetection={closestCenter}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
        >
          <SortableContext items={imageFiles} strategy={rectSortingStrategy}>
            <div
              className={`grid grid-cols-2 gap-1 p-4 sm:grid-cols-3 lg:grid-cols-5 [&>*:not(.aspect-auto)]:aspect-square`}
            >
              {imageFiles.map((img, i) => (
                <Image
                  key={img.id}
                  image={img}
                  featured={i === 0}
                  className=" bg-white"
                  isMarked={marked.includes(img.id)}
                  handleMarked={handleMarked}
                  handleFeatured={handleFeatured}
                  setImgBoxElm={setImgBoxElm}
                />
              ))}

              {/* floating abstract element to show on drag */}
              <DragOverlay
                adjustScale={true}
                modifiers={[restrictToWindowEdges]}
                zIndex={10}
                className="cursor-grabbing overflow-hidden border bg-white shadow-md"
              >
                {!!activeElm && (
                  <img
                    className="h-full w-full object-cover"
                    src={activeElm.src}
                    alt={activeElm.id}
                  />
                )}
              </DragOverlay>

              <AddNewImage
                className={
                  !imageFiles.length ? "col-span-full mx-auto p-12" : ""
                }
                setImageFiles={setImageFiles}
              />
            </div>
          </SortableContext>
        </DndContext>

        {/* footer portion */}
        <GalleryFooter />
      </div>

      <ImageBox imgBoxElm={imgBoxElm} setImgBoxElm={setImgBoxElm} />
    </>
  )
}

export default Gallery
