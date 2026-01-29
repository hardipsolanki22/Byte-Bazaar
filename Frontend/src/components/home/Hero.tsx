import React, { useState } from "react";
import { LucideChevronsLeftRightEllipsis, Circle, CircleDot } from "lucide-react"

const Hero: React.FC = () => {

  const [imgIndex, setImgIndex] = useState(0)
  const [imgUrls, setImgUrls] = useState([
    "./66faf3950cda0b7a.webp",
    "./66faf3950cda0b7a.webp",
    "./66faf3950cda0b7a.webp",
    // "./byteBazaar.png",
    // "./66faf3950cda0b7a.webp",
    // "./66faf3950cda0b7a.webp"
  ])

  // setTimeout(() => {
  //   showNextImage()
  // }, 5000);

  const showNextImage = () => {
    setImgIndex(index => {
      if (index === imgUrls.length - 1) return index = 0
      return index + 1
    })
  }
  const showPrevImage = () => {
    setImgIndex(index => {
      if (index === 0) return imgUrls.length - 1
      return index - 1
    })
  }

  return (
    <section className="w-full items-center justify-center flex flex-col ">
      {/* Hero Banner */}
      <div className=" w-full relative pb-4 px-2  bg-white  ">
        <div className="w-full h-full overflow-hidden flex">
          {imgUrls.map(url => (
            <img
              key={url}
              src={url}
              alt="hero"
              className="shrink-0 grow-0 transition ease-in-out duration-300 "
              style={{ translate: `${-100 * imgIndex}%` }}
            />
          ))}
        </div>
        <button
          className="absolute top-0 bottom-3 sm:bottom-0 left-10 cursor-pointer "
          onClick={showPrevImage}
          aria-label="View Previous Image"
        >
          <LucideChevronsLeftRightEllipsis className="h-4 w-4 sm:h-auto sm:w-auto" />
        </button>
        <button
          className="absolute top-0 bottom-3  sm:bottom-0 right-10 cursor-pointer"
          onClick={showNextImage}
          aria-label="View Next Image"
        >
          <LucideChevronsLeftRightEllipsis className="h-4 w-4 sm:h-auto sm:w-auto" />
        </button>

        <div className="text-center absolute bottom-1 sm:bottom-4 left-1/2 -translate-1/2
         sm:space-x-2 ease-in-out">
          {imgUrls.map((_, idx) => (
            <button
              className="w-2 h-2 focus:outline-none cursor-pointer"
              onClick={() => setImgIndex(idx)}
              aria-label={`View Image ${idx}`}
            >
              {idx === imgIndex ? <CircleDot 
                className="h-2 w-2 sm:h-[20.5px] sm:w-[20.5px] stroke-white fill-black hover:scale-110 transition-transform duration-300"
              /> : <Circle  className="h-2 w-2 sm:h-5 sm:w-5" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
