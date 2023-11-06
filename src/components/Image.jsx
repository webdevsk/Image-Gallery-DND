import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Switch, Transition } from "@headlessui/react"
import { memo, useState } from "react"
import { HiOutlineStar } from "react-icons/hi2"
import { IoCheckmarkCircleSharp, IoExpand } from "react-icons/io5"

const Image = memo((props) => {
  const [isHovered, setIsHovered] = useState(false)
  const {
    image,
    className,
    featured,
    isMarked,
    handleMarked,
    handleFeatured,
    setImgBoxElm,
    ...sanitizedProps
  } = props

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
    transition: {
      duration: 300,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
    // Required to animate when sorted by other means except dragging
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({
        ...args,
        wasDragging: true,
      }),
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    transformOrigin: "0 0",
    // Required for mobile devices to prevent scroll while trying to drag
    touchAction: "none",
  }

  // Cleaner approach
  const containerClasses = [
    "cursor-grab relative overflow-hidden flex items-center justify-center",
    className ?? "",
    isDragging ? "[&>*]:opacity-30 [&>*]:brightness-75 shadow-inner" : "",
    featured ? "col-span-2 row-span-2" : "",
  ]
    .join(" ")
    .trim()

  return (
    <div
      {...sanitizedProps}
      {...attributes}
      {...listeners}
      className={containerClasses}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={setNodeRef}
      style={style}
    >
      <img
        className={`h-full w-full object-cover transition-transform duration-300 ${
          isHovered && !isDragging ? "scale-105" : ""
        }`}
        src={image?.src}
        alt={image?.id}
      />

      {/* Overlay for buttons */}
      <Transition
        show={isHovered || isMarked}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-0"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`overlay absolute inset-0 grid grid-cols-[repeat(2,_max-content)] place-content-between p-2  ${
            isMarked ? "backdrop-brightness-105 backdrop-contrast-50" : ""
          }`}
        >
          {/* Featured */}
          <div>
            {!featured && isHovered && (
              <button
                className="rounded-full border-2 border-transparent bg-white fill-none text-2xl text-yellow-400 opacity-70 transition-colors hover:fill-current hover:opacity-100"
                onClick={() => {
                  setIsHovered(false)
                  handleFeatured(image.id)
                }}
                title="Set as featured image"
              >
                <HiOutlineStar className="fill-inherit" />
              </button>
            )}
          </div>

          {/* Mark */}
          <div>
            <Switch
              title={isMarked ? "Unmark item" : "Mark item"}
              checked={isMarked}
              onChange={(bool) => handleMarked(image.id, bool)}
              name={image.id}
              className={`${
                isMarked ? "" : ""
              } grid place-items-center rounded-full border-2 bg-white text-2xl text-accent opacity-70 hover:opacity-100`}
            >
              <span className="sr-only">Mark item</span>
              <IoCheckmarkCircleSharp className={`fill-current`} />
            </Switch>
          </div>

          <div></div>
          {/* Imagebox */}
          <div>
            {isHovered && (
              <button
                className={`grid place-items-center rounded-full bg-white text-2xl text-body opacity-70 hover:opacity-100`}
                onClick={() => setImgBoxElm(image)}
                title="Expand image"
              >
                <IoExpand className="p-0.5" />
              </button>
            )}
          </div>
        </div>
      </Transition>
    </div>
  )
})
Image.displayName = "Image"
export default Image
