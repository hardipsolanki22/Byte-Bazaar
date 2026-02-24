import React, { useEffect, useState } from "react";
import { LucideChevronsLeftRightEllipsis, Circle, CircleDot } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getHeroBanners } from "../../features/admin/heroBanner/heroBannerSlice";

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
    return (
      <div className='flex items-center  w-full justify-center h-full'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <section className="w-full items-center justify-center flex flex-col ">
      {/* Hero Banner */}
      <div className=" w-full relative pb-4 px-2  bg-white  ">
        <div className="w-full h-full overflow-hidden flex">
          {banners?.map(banner => (
            <img
              key={banner._id}
              src={banner.image}
              alt="hero"
              className="shrink-0 grow-0 transition ease-in-out duration-300 h-20 sm:h-44 lg:h-52 w-full "
              style={{ translate: `${-100 * imgIndex}%` }}
            />
          ))}
        </div>
        <button
          className="absolute top-0 bottom-3 sm:bottom-0 left-2 sm:left-5 cursor-pointer "
          onClick={showPrevImage}
          aria-label="View Previous Image"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 group-hover:text-emerald-600 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute top-0 bottom-3 sm:bottom-0 right-2 sm:right-5 cursor-pointer"
          onClick={showNextImage}
          aria-label="View Next Image"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 group-hover:text-emerald-600 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute bottom-1 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
          {banners?.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setImgIndex(idx)}
              className="group focus:outline-none"
              aria-label={`View Image ${idx + 1}`}
            >
              <div className={`
        transition-all duration-500 ease-out
        ${idx === imgIndex
                  ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-white rounded-full shadow-lg shadow-white/50'
                  : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/40 rounded-full hover:bg-white/70 hover:scale-110'
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
