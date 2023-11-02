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
import { Transition } from "@headlessui/react"

const Gallery = () => {
  const [imageFiles, setImageFiles] = useState(generatedImages)
  const [marked, setMarked] = useState([])
  const [activeElm, setActiveElm] = useState(null)

  // functions
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleFeatured = (id) => {
    setImageFiles((imageFiles) => {
      const elm = imageFiles.find((img) => img.id === id)
      return imageFiles
        .toSpliced(
          imageFiles.findIndex((img) => img.id === id),
          1,
        )
        .toSpliced(0, 0, elm)
    })
  }

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

  const handleDragEnd = (data) => {
    // console.log(data)
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

  const handleDragCancel = () => setActiveElm(null)

  return (
    <>
      <div className="relative mx-auto max-w-[56rem] rounded-xl border bg-gradient-to-b from-gray-100 from-0% to-gray-200 to-100% shadow-lg">
        {/* title portion */}
        <Title marked={marked} handleDelete={handleDelete} />

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
                  handleFeatured={handleFeatured}
                />
              ))}

              {/* abstract element to show on drag */}
              <DragOverlay
                adjustScale={true}
                modifiers={[restrictToWindowEdges]}
                zIndex={10}
                className="cursor-grabbing overflow-hidden rounded-lg border bg-white shadow-md"
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
          </SortableContext>
        </DndContext>
      </div>
    </>
  )
}

export default Gallery
const Title = ({ marked, handleDelete }) => {
  return (
    <div className="sticky top-0 z-20 flex min-h-[2.5rem] items-center overflow-hidden border-b bg-gray-50 px-4">
      <div>
        {!marked.length && <h5>Image Gallery</h5>}
        {!!marked.length && <h6>{marked.length} files selected</h6>}
      </div>
      <div className="ms-auto">
        <Transition
          show={!!marked.length}
          enter="transition transform duration-75"
          enterFrom="opacity-0 translate-y-full"
          enterTo="opacity-100 translate-y-0"
          leave="transition transform duration-75 "
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-full"
        >
          <button
            onClick={handleDelete}
            className="font-semibold text-danger hover:text-danger-hover"
          >
            <small>Delete files</small>
          </button>
        </Transition>
      </div>
    </div>
  )
}
