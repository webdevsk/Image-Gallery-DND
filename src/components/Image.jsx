import { useDraggable, useDroppable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Switch, Transition } from "@headlessui/react"
import { memo, useState } from "react"
import { HiMiniCheckCircle, HiOutlineStar } from "react-icons/hi2"

const Image = memo((props) => {
  const {
    image,
    className,
    featured,
    isMarked,
    handleMarked,
    ...filteredProps
  } = props
  const [isHovered, setIsHovered] = useState(false)

  const { active, attribues, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: image.id,
    })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }
  //Cleaner code
  const containerClasses = [
    "relative overflow-hidden rounded-lg border bg-white",
    className ?? "",
    featured ? "col-span-2 row-span-2" : "",
    // active ? "z-10" : "",
  ].join(" ")

  return (
    <div
      {...filteredProps}
      className={containerClasses}
      // onMouseOver={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      ref={setNodeRef}
      style={style}
      {...attribues}
      {...listeners}
    >
      <img
        className="aspect-square w-full object-contain"
        src={image?.src}
        alt={image?.id}
      />

      {/* <Transition
        show={isHovered || isMarked}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`overlay absolute inset-0 grid grid-flow-col place-content-between p-2 ${
            isMarked ? " backdrop-brightness-105 backdrop-contrast-75" : ""
          }`}
        >
          <div>
            {!featured && isHovered && (
              <button className="rounded-full bg-white fill-none text-2xl text-yellow-400 transition-colors hover:fill-current">
                <HiOutlineStar className="fill-inherit" />
              </button>
            )}
          </div>
          <div>
            <Switch
              checked={isMarked}
              onChange={(bool) => handleMarked(image.id, bool)}
              name={image.id}
              className={`${
                isMarked ? "" : ""
              } text-accent grid place-items-center rounded-full border bg-white text-2xl`}
            >
              <span className="sr-only">Mark Image file for deletion</span>
              <HiMiniCheckCircle
                className={`fill-current ${
                  isMarked ? "opacity-100" : "opacity-30 hover:opacity-50"
                }`}
              />
            </Switch>
          </div>
        </div>
      </Transition> */}
    </div>
  )
})
Image.displayName = "Image"
export default Image
