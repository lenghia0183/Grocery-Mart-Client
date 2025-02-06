'use client';

import Slider from 'react-slick';
import { useRef, useState } from 'react';
import IconButton from '@/components/IconButton';

import clsx from 'clsx';
import ProductCard from './productCard';
import Divider from './Divider';

interface Product {
  id: string;
  nameProduct: string;
  price: number;
  thumbnail: string;
  startRate: number;
  maker: string;
  inStock: boolean;
}

const fakeProducts: Product[] = [
  {
    id: 'P001',
    nameProduct: 'Matcha Latte Premium',
    price: 15000,
    thumbnail: 'https://img.freepik.com/free-photo/matcha-green-tea-powder-wooden-bowl_1150-11201.jpg',
    startRate: 4.8,
    maker: 'test',
    inStock: true,
  },
  {
    id: 'P002',
    nameProduct: 'Jasmine Green Tea',
    price: 12000,
    thumbnail: 'https://img.freepik.com/free-photo/matcha-green-tea-powder-wooden-bowl_1150-11201.jpg',
    startRate: 4.5,
    maker: 'test',
    inStock: false,
  },
  {
    id: 'P003',
    nameProduct: 'Earl Grey Classic Peppermint Tea  ',
    price: 14000,
    maker: 'test',
    thumbnail: 'https://img.freepik.com/free-photo/matcha-green-tea-powder-wooden-bowl_1150-11201.jpg',
    startRate: 4.7,
    maker: 'test',
    inStock: true,
  },
  {
    id: 'P004',
    nameProduct: 'Oolong Milk Tea Peppermint Tea Peppermint Tea',
    price: 16000,
    thumbnail: 'https://img.freepik.com/free-photo/matcha-green-tea-powder-wooden-bowl_1150-11201.jpg',
    startRate: 4.6,
    maker: 'test',
    inStock: true,
  },
  {
    id: 'P005',
    nameProduct: 'Chamomile Herbal Tea Peppermint TeaPeppermint Tea',
    price: 11000,
    thumbnail: 'https://img.freepik.com/free-photo/chamomile-tea_3456-789.jpg',
    startRate: 4.4,
    maker: 'test',
    inStock: false,
  },
  {
    id: 'P006',
    nameProduct: 'Peppermint Tea Peppermint Tea Peppermint Tea',
    price: 13000,
    thumbnail: 'https://img.freepik.com/free-photo/peppermint-tea_1234-567.jpg',
    startRate: 4.9,
    maker: 'test',
    inStock: true,
  },
];

interface RelatedProductsProps {
  className?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ className }) => {
  const slider = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    dotsClass: 'absolute left-1/2 -translate-x-1/2',
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex space-x-5 justify-center"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button
        className={clsx('w-[10px] h-[10px] rounded-full', i === currentSlide ? 'bg-blue-400' : 'bg-gray-400')}
        style={{
          color: 'transparent',
        }}
      ></button>
    ),
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="dark:bg-dark-500 bg-gray-100 p-10">
      <div className="container">
        <h3 className="text-2xl font-semibold text-blue">Sản phẩm liên quan</h3>
        <Divider marginBottom="30px" />

        <section className={clsx('', className)}>
          {fakeProducts.length > 2 ? (
            <div className="relative">
              <IconButton
                type="button"
                className="absolute top-1/2 -translate-y-1/2 left-[-50px] hidden sm:flex"
                iconName="arrowSlider"
                variant="contained"
                size="small"
                bgColor="emerald"
                iconColor="white"
                bgHoverColor="yellow"
                iconSize={1.5}
                onClick={() => slider.current?.slickPrev()}
              />

              <IconButton
                type="button"
                className="rotate-180 absolute top-1/2 -translate-y-1/2 right-[-50px] hidden sm:flex"
                iconName="arrowSlider"
                variant="contained"
                size="small"
                bgColor="emerald"
                iconColor="white"
                bgHoverColor="yellow"
                iconSize={1.5}
                onClick={() => slider.current?.slickNext()}
              />

              <Slider ref={slider} {...settings}>
                {fakeProducts.map((item) => (
                  <div key={item.id} className="p-2">
                    <ProductCard data={item} className="dark!shadow-none !shadow-md" />
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              {fakeProducts.map((item) => (
                <div className="w-[25%]" key={item.id}>
                  <ProductCard data={item} className="dark:shadow-none text-red" />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default RelatedProducts;
