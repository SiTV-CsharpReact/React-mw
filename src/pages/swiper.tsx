import React, { useState, useEffect, useRef } from 'react';
import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './slide.scss';

SwiperCore.use([Autoplay,FreeMode]);

const MySwiper = () => {
    const swiper = useSwiper();
    // console.log(swiper)
  const [slidesToShow, setSlidesToShow] = useState(Math.floor(window.innerWidth / 220));
  const [isHoveringLeft, setIsHoveringLeft] = useState(false);
  const [isHoveringRight, setIsHoveringRight] = useState(false);
  const swiperRef = useRef(null);
//   const swiperRef = useRef<Swiper | null>(null);
  //console.log(swiperRef)
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(Math.floor(window.innerWidth / 220));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHoverRight = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveringRight(true);
    e.currentTarget.classList.add('scrollingHotSpotRightVisible');
    // console.log(swiperRef.current)
    // swiper.slideNext()
   // if(swiperRef.current) swiperRef.current.slideNext()
  };

  const handleLeaveRight = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveringRight(false);
    e.currentTarget.classList.remove('scrollingHotSpotRightVisible');
  };

  const handleHoverLeft = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveringLeft(true);
    e.currentTarget.classList.add('scrollingHotSpotLeftVisible');
    // swiperRef.current.slidePrev();
  };

  const handleLeaveLeft = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHoveringLeft(false);
    e.currentTarget.classList.remove('scrollingHotSpotLeftVisible');

  };

  const swiperOptions = {
    slidesPerView: slidesToShow,
    spaceBetween: 30,
    freeMode: true,
    // autoplay:{
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
    pagination: {
      clickable: true,
    },
  
  };

  return (
    <div className='h-[30px] bg-BGTableMarket text-white'>
         <div
        className="scrollingHotSpotLeft"
        onMouseEnter={handleHoverLeft}
        onMouseLeave={handleLeaveLeft}
      />
   <Swiper {...swiperOptions}
     onSwiper={(swiper) => console.log(swiper)}
   ref={swiperRef}>
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
      <SwiperSlide>Slide 10</SwiperSlide>
      <SwiperSlide>Slide 11</SwiperSlide>
      <SwiperSlide>Slide 12</SwiperSlide>
      <SwiperSlide>Slide 13</SwiperSlide>
      <SwiperSlide>Slide 14</SwiperSlide>
      <SwiperSlide>Slide 15</SwiperSlide>
    </Swiper>
    <div
        className="scrollingHotSpotRight"
        onMouseEnter={handleHoverRight}
        onMouseLeave={handleLeaveRight}
      />
    </div>
 
  );
};

export default MySwiper;