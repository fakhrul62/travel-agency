import React from 'react'

const InfoPill = ({text, image}: InfoPillProps) => {
  return (
    <figure className='info-pill flex items-center gap-2 px-2 py-1 rounded-full bg-[#ededed] w-fit max-w-full'>
        <img src={image} alt={text} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
        <figcaption className="text-xs sm:text-sm md:text-base truncate max-w-[100px] sm:max-w-[160px]">{text}</figcaption>
    </figure>
  )
}

export default InfoPill