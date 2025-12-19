import React, { useState } from "react";
import { Button } from "../lightswind/button";
import { LucideChevronsLeftRightEllipsis, Circle, CircleDot } from "lucide-react"

const Hero: React.FC = () => {

  type CategoriesType = {
    name: string;
    slug: string;
  }

  const categories: CategoriesType[] = [
    { name: "Electronics", slug: "electronics" },
    { name: "Fashion", slug: "fashion" },
    { name: "Home & Kitchen", slug: "home-kitchen" },
    { name: "Books", slug: "books" },
    { name: "Toys & Games", slug: "toys-games" },
    { name: "Sports", slug: "sports" },
    { name: "Beauty", slug: "beauty" },
    { name: "Automotive", slug: "automotive" },
    { name: "Grocery", slug: "grocery" },
    { name: "Health", slug: "health" },
    { name: "Garden", slug: "garden" },
    { name: "Music", slug: "music" },
    { name: "Office Supplies", slug: "office-supplies" },
    { name: "Pet Supplies", slug: "pet-supplies" },
    { name: "Baby Products", slug: "baby-products" },




  ]

  const [imgIndex, setImgIndex] = useState(0)
  const [imgUrls, setImgUrls] = useState([
    "./66faf3950cda0b7a.webp",
    "./66faf3950cda0b7a.webp",
    "./66faf3950cda0b7a.webp",
    // "./byteBazaar.png",
    // "./66faf3950cda0b7a.webp",
    // "./66faf3950cda0b7a.webp"
  ])

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
      <div className="flex w-full text-center items-center justify-center
       space-x-2 overflow-x-auto p-2  border-b border-gray-200 bg-white">
        {categories.map((category, idx) => (
          <Button
            variant="link"
            key={idx}
            className="cursor-pointer"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Hero Banner */}
      <div className=" w-full relative pb-4 px-2  bg-white mt-3 ">
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
          className="absolute top-0 bottom-0 left-10 cursor-pointer"
          onClick={showPrevImage}
          aria-label="View Previous Image"
        >
          <LucideChevronsLeftRightEllipsis />
        </button>
        <button
          className="absolute top-0 bottom-0 right-10 cursor-pointer"
          onClick={showNextImage}
          aria-label="View Next Image"
        >
          <LucideChevronsLeftRightEllipsis />
        </button>

        <div className="text-center absolute bottom-4 left-1/2 -translate-1/2 space-x-2 ease-in-out">
          {imgUrls.map((_, idx) => (
            <button
              className="w-2 h-2 focus:outline-none cursor-pointer"
              onClick={() => setImgIndex(idx)}
              aria-label={`View Image ${idx}`}
            >
              {idx === imgIndex ? <CircleDot width={19} height={19}
                className="stroke-white fill-black hover:scale-110 transition-transform duration-300"
              /> : <Circle width={19} height={19} className="" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
