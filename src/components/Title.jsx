import { Transition } from "@headlessui/react"

const Title = ({ marked, handleDelete }) => {
  return (
    <div className="sticky top-0 z-[1] flex min-h-[2.5rem] items-center gap-4 overflow-hidden border-b bg-gray-100 px-4">
      <div>
        {!marked.length && <h5>Image Gallery</h5>}
        {!!marked.length && <h6>{marked.length} files selected</h6>}
      </div>
      <div>
        {/* {!!marked.length && (
          <button>
            <p>Mark All</p>
          </button>
        )} */}
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

export default Title
