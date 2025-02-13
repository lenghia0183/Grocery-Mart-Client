'use client';

import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from '@/components/Image';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const mainSliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    asNavFor: nav2 || undefined,
    ref: sliderRef1,
    beforeChange: (_: number, next: number) => setActiveIndex(next),
  };

  const navSliderSettings = {
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: nav1 || undefined,
    ref: sliderRef2,
    beforeChange: (_: number, next: number) => setActiveIndex(next),
  };

  return (
    <div>
      <div className="relative">
        <Slider {...mainSliderSettings} className="main-slider bg-black rounded-md overflow-hidden">
          {images.map((image, index) => (
            <Image key={index} src={image} alt="Grocery mart" width={200} height={200} className="aspect-square" />
          ))}
        </Slider>
      </div>

      <Slider {...navSliderSettings} className="nav-slider -ml-1 mt-2">
        {images.map((image, index) => (
          <div key={index} className="aspect-square rounded-md p-2">
            <div
              className={`image-container p-2 border-2 rounded-xl ${
                activeIndex === index ? 'border-blue-400' : 'border-gray-400'
              }`}
            >
              <Image src={image} alt="Grocery mart" width={200} height={200} className="aspect-square" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductGallery;
