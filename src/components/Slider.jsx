/* eslint-disable react/prop-types */
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useState, useEffect } from "react";

const ProjectsSlider = ({ imgs, index }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(index || 0);

  useEffect(() => {
    setActiveIndex(index || 0);
  }, [index]);

  return (
    <div className="w-full h-full slider">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        onTouchEnd={() => setIsDragging(false)}
        onSliderMove={() => setIsDragging(true)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        initialSlide={activeIndex}
        className="h-full"
      >
        {imgs.map((project, i) => (
          <SwiperSlide
            key={i}
            className={`${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            } border-[2px] border-[#0a0a0a] h-full`}
          >
            <div className="flex max-h-full">
              <img src={imgs[i]} alt="" className="" />
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-pagination"></div>
      </Swiper>
    </div>
  );
};

export default ProjectsSlider;
