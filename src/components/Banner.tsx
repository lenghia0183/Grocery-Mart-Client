'use client';

import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import images from '@/asset/images';
import Image from './Image';
import clsx from 'clsx';
import IconButton from './IconButton';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BannerProps {
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ className }) => {
  const [currentSlide, setCurrentSlide] = useState(0); // State lưu vị trí slide hiện tại
  const slider = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    fade: true,
    dotsClass: 'absolute left-1/2 -translate-x-1/2 bottom-5',
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex space-x-5 justify-center"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button
        className={clsx('w-[10px] h-[10px] rounded-full', i === currentSlide ? 'bg-white' : 'bg-gray-400')}
        style={{
          color: 'transparent',
        }}
      ></button>
    ),
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
  };

  const banners = [
    {
      image: images.banner1,
    },
    {
      image: images.banner2,
    },
    {
      image: images.banner3,
    },
  ];

  return (
    <div className={clsx('container', className)}>
      <div className="relative">
        <IconButton
          type="button"
          className="rotate-180 absolute top-1/2 -translate-y-1/2 -left-8 hidden sm:flex"
          iconName="arrowSlide"
          variant="contained"
          bgColor="yellow-300 dark:gray-500"
          iconColor="white dark:dark"
          iconHoverColor="none"
          bgHoverColor="yellow dark:gray-200"
          rounded
          iconSize={1}
          width="25px"
          height="25px"
          onClick={() => {
            slider?.current?.slickPrev();
          }}
        />

        <IconButton
          type="button"
          className=" absolute top-1/2 -translate-y-1/2 -right-8 hidden sm:flex"
          iconName="arrowSlide"
          variant="contained"
          bgColor="yellow-300 dark:gray-500"
          iconColor="white dark:dark"
          iconHoverColor="none"
          bgHoverColor="yellow dark:gray-200"
          iconSize={1}
          width="25px"
          height="25px"
          rounded
          onClick={() => {
            slider?.current?.slickNext();
          }}
        />

        <Slider {...settings} ref={slider}>
          {banners.map((banner, index) => (
            <Image
              key={index}
              src={banner.image}
              alt={`Grocery Mart`}
              priority
              loading="eager"
              className="w-full h-full  aspect-[6/3] md:aspect-[10/4] xl:aspect-[8/3] rounded-[25px] object-cover"
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
