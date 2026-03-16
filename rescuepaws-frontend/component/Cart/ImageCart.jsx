import React from 'react'

const ImageCart = ({image}) => {
  return (
    <div className='w-full h-52 flex justify-center items-center overflow-hidden object-cover'>
      <img src={image || "https://res.cloudinary.com/dgpiqnweu/image/upload/v1773045546/i5fcfbdlvrkd1u2izf4q.jpg"} alt="" />
    </div>
  )
}

export default ImageCart
