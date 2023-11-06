import { Switch, Transition } from "@headlessui/react"
import { IoCheckmarkDone, IoCheckmarkDoneCircleSharp } from "react-icons/io5"

const Title = ({
  marked,
  imageFiles,
  handleDelete,
  handleMarkAll,
  handleUnmarkAll,
}) => {
  return (
    <div className="sticky top-0 z-[1] flex min-h-[3rem] flex-wrap items-center gap-1 overflow-y-hidden border-b bg-gray-100 px-4 py-2 [&_*]:leading-6">
      <div>
        {!marked.length && <h5>Image Gallery</h5>}
        {!!marked.length && (
          <h6>
            <IoCheckmarkDone className=" me-1 inline align-text-bottom text-lg text-accent" />
            {marked.length}{" "}
            <span className="max-sm:hidden">files selected</span>
          </h6>
        )}
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
          className="flex gap-2 xl:gap-4"
        >
          <div className="flex gap-2">
            <Switch
              title="Batch Selection"
              checked={imageFiles.length === marked.length}
              onChange={(bool) => (bool ? handleMarkAll() : handleUnmarkAll())}
              // name={image.id}
              className={`grid place-items-center rounded-full border-2 bg-white text-2xl text-accent`}
            >
              {({ checked }) => (
                <>
                  <span className="sr-only">Batch Selection</span>
                  <IoCheckmarkDoneCircleSharp
                    className={`fill-current transition-opacity  ${
                      checked ? "opacity-100" : "opacity-0 hover:opacity-70"
                    }`}
                  />
                </>
              )}
            </Switch>
          </div>
          {/* <button onClick={handleMarkAll}>
            <small className=" hover:underline">Select All</small>
          </button>
          <button onClick={handleUnmarkAll}>
            <small className=" hover:underline">Select None</small>
          </button> */}
          <button
            onClick={handleDelete}
            className="font-semibold text-danger hover:text-danger-hover hover:underline"
          >
            <small>Delete files</small>
          </button>
        </Transition>
      </div>
    </div>
  )
}

export default Title
