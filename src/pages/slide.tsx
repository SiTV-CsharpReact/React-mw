import React, { useRef, useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

interface Props {
  slides: any[];
}

const Slide = () => {
  const slides = [
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      text: 'Fusce ac dolor eget diam eleifend cursus in vel augue.',
    },
    {
      text: 'Vestibulum tristique sapien sit amet quam congue, in blandit nunc fermentum.',
    },
    {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      text: 'Fusce ac dolor eget diam eleifend cursus in vel augue.',
    },
    {
      text: 'Vestibulum tristique sapien sit amet quam congue, in blandit nunc fermentum.',
    },
  ];
  const [isAutoplay, setIsAutoplay] = useState(false);
  const swiperRef = useRef<Swiper | null>(null);

  useEffect(() => {
    swiperRef.current = new Swiper('.swiper-container', {
      slidesPerView:3,
      // Các tùy chọn Swiper khác ở đây
      loop: true,
      freeMode: true,
      autoplay: {
        delay: 3000, // thời gian chuyển slide mặc định
        disableOnInteraction: false, // không ngừng tự động chuyển slide khi người dùng tương tác
      },
    });
  }, []);

  const handleMouseEnter = () => {
    setIsAutoplay(true);
  };

  const handleMouseLeave = () => {
    setIsAutoplay(false);
  };

  useEffect(() => {
    let intervalId: any;

    if (isAutoplay) {
      intervalId = setInterval(() => {
        if (swiperRef.current?.isEnd) {
          swiperRef.current?.slideTo(0);
        } else {
          swiperRef.current?.slideNext();
        }
      }, 3000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isAutoplay]);

  return (
    <div
      className="swiper-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="swiper-wrapper">
        {slides.map((slide, index) => (
          <div className="swiper-slide" key={index}>
            {slide.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide;