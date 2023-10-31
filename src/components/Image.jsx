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

      <div className="overlay absolute inset-0"></div>
    </div>
  )
}

export default Image
