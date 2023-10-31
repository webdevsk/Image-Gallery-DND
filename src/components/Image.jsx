import { Transition } from "@headlessui/react"

const Image = (props) => {
  const { image, className, featured, ...filteredProps } = props
  return (
    <div
      {...filteredProps}
      className={`relative overflow-hidden rounded-md border bg-white ${
        className ?? ""
      } ${featured ? "col-span-2 row-span-2" : ""}`}
    >
      <img
        className="aspect-square w-full object-contain"
        src={image?.src}
        alt={image?.id}
      />

      <Transition
        show={true}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="overlay absolute inset-0 p-2">
          <div className="flex items-center"></div>
        </div>
      </Transition>
    </div>
  )
}

export default Image
