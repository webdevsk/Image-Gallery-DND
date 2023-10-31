import { Transition } from "@headlessui/react"
import { useState } from "react"
import { HiOutlineStar } from "react-icons/hi2"

const Image = (props) => {
  const { image, className, featured, ...filteredProps } = props
  const [isHovered, setIsHovered] = useState(false)

  //Cleaner code
  const containerClasses = [
    "relative overflow-hidden rounded-lg border bg-white",
    className ?? "",
    featured ? "col-span-2 row-span-2" : "",
  ].join(" ")

  console.log(containerClasses)
  return (
    <div
      {...filteredProps}
      className={containerClasses}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="aspect-square w-full object-contain"
        src={image?.src}
        alt={image?.id}
      />

      <Transition
        show={isHovered}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="overlay absolute inset-0 grid grid-flow-col place-content-between p-1 xl:p-2">
          <div>
            {!featured && (
              <button className="rounded-full bg-white fill-none text-xl text-yellow-400 transition-colors hover:fill-current">
                <HiOutlineStar className="fill-inherit" />
              </button>
            )}
          </div>
          <div>{/* checkbox */}</div>
        </div>
      </Transition>
    </div>
  )
}

export default Image
