'use client';

import React, { useRef } from 'react';
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    fade: true,
  };

  const slider = useRef<Slider>(null);

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
    <div className={clsx('container', { className })}>
      <div className="relative">
        <IconButton
          type="button"
          className="rotate-90 absolute top-1/2 -translate-y-1/2 -left-8 hidden sm:flex"
          iconName="arrowDown"
          iconStrokeWidth={500}
          variant="contained"
          bgColor="yellow-400"
          iconColor="white"
          iconHoverColor="none"
          bgHoverColor="yellow"
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
          className="-rotate-90 absolute top-1/2 -translate-y-1/2 -right-8 hidden sm:flex "
          iconName="arrowDown"
          variant="contained"
          bgColor="yellow-400"
          iconColor="white"
          bgHoverColor="yellow"
          iconHoverColor="none"
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
              className="w-full h-full aspect-[7/3] rounded-[25px]"
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
