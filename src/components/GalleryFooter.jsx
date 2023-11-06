import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5"

const GalleryFooter = () => {
  return (
    <div className="flex min-h-[2.5rem] flex-wrap items-center gap-1 border-t border-gray-300 px-4 py-2 xl:gap-2 [&_*]:leading-6">
      <div className="flex items-center gap-1 xl:gap-2">
        <small className="">Project:</small>
        <a
          href="https://www.flaticon.com/free-icon/gallery_9853877"
          title="gallery icons"
          target="_blank"
          rel="noreferrer"
        >
          <img
            width={16}
            className="inline align-text-top"
            src="./images/logo.png"
            alt="logo"
          />
        </a>
        <a
          href="https://github.com/webdevsk/Image-Gallery-DND"
          className="text-gray-900 transition-colors hover:text-gray-600"
        >
          <small className="">Image Gallery DND</small>
        </a>
      </div>
      <div className="flex items-center gap-2 max-sm:w-full sm:ms-auto">
        <small className="  sm:ms-auto">Developed by: Salman Khan</small>
        <a
          href="https://github.com/webdevsk"
          target="_blank"
          rel="noreferrer"
          className="text-xl text-gray-900 transition-colors hover:text-gray-600 max-sm:ms-auto"
        >
          <IoLogoGithub className="inline align-text-top" />
        </a>
        <a
          href="https://www.linkedin.com/in/webdevsk/"
          target="_blank"
          rel="noreferrer"
          className="text-xl text-gray-900 transition-colors hover:text-gray-600"
        >
          <IoLogoLinkedin className="inline align-text-top" />
        </a>
      </div>
    </div>
  )
}

export default GalleryFooter
