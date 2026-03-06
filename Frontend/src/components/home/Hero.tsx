import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getHeroBanners } from "../../features/heroBanner/heroBannerSlice";
import { BannerSkeleton } from "../skeleton/heroBannerSkeleton";

const Hero: React.FC = () => {

  const banners = useAppSelector(({ banner }) => banner.banners)
  const loading = useAppSelector(({ banner }) => banner.loading)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!banners?.length) dispatch(getHeroBanners())
  }, [dispatch])

  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      showNextImage();
    }, 5000);

    // Cleanup timer on component unmount or when imgIndex changes
    return () => clearTimeout(timer);
  }, [imgIndex, banners?.length]);

  const showNextImage = () => {
    setImgIndex(index => {
      if (banners?.length && index === banners.length - 1) return index = 0
      return index + 1
    })
  }
  const showPrevImage = () => {
    setImgIndex(index => {
      if (index === 0) return banners?.length && banners?.length - 1 || -1
      return index - 1
    })
  }

  if (loading === "pending") {
    return <BannerSkeleton />
  }

  return (
    <section className="w-full">
      {/* Hero Banner */}
      <div className="w-full relative bg-white">

        {/* Image Track */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform ease-in-out duration-300"
            style={{ transform: `translateX(-${100 * imgIndex}%)` }}
          >
            {banners?.map(banner => (
              <img
                key={banner._id}
                src={banner.image}
                alt="hero"
                className="shrink-0 w-full object-cover
              h-36
              sm:h-52
              md:h-64
              lg:h-80
              xl:h-96"
              />
            ))}
          </div>
        </div>

        {/* Prev Button */}
        <button
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4
        bg-white/70 hover:bg-white
        backdrop-blur-sm
        rounded-full
        p-1.5 sm:p-2
        shadow-md
        transition-all duration-200
        cursor-pointer
        focus:outline-none"
          onClick={showPrevImage}
          aria-label="View Previous Image"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4
        bg-white/70 hover:bg-white
        backdrop-blur-sm
        rounded-full
        p-1.5 sm:p-2
        shadow-md
        transition-all duration-200
        cursor-pointer
        focus:outline-none"
          onClick={showNextImage}
          aria-label="View Next Image"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2
      flex items-center gap-1.5 sm:gap-2">
          {banners?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setImgIndex(idx)}
              className="focus:outline-none"
              aria-label={`View Image ${idx + 1}`}
            >
              <div className={`
            transition-all duration-500 ease-out rounded-full
            ${idx === imgIndex
                  ? 'w-5 sm:w-7 h-1.5 sm:h-2 bg-white shadow-lg shadow-white/50'
                  : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80 hover:scale-110'
                }
          `} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
