import { useState } from "react"

const Gallery = () => {
  const [marked, setMarked] = useState([])
  return (
    <>
      <div className="rounded-xl border bg-gray-100 shadow-md">
        {/* title portion */}
        <div className="flex min-h-[2.5rem] items-center border-b px-4">
          <div>
            {!marked.length && <h5>Image Gallery</h5>}
            {!!marked.length && <h5>{marked.length} files selected</h5>}
          </div>
          <div className="ms-auto">
            {!!marked.length && (
              <button className="text-danger hover:text-danger-hover">
                <h6>Delete files</h6>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Gallery
