const Image = (props) => {
  const { image, className, featured, ...filteredProps } = props
  return (
    <div
      {...filteredProps}
      className={`overflow-hidden rounded-md border ${className ?? ""} ${
        featured ? "col-span-2 row-span-2" : ""
      }`}
    >
      <img
        className="aspect-square w-full object-contain"
        src={image?.src}
        alt={image?.id}
      />
    </div>
  )
}

export default Image
