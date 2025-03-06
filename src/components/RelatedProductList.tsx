'use client';

import Slider from 'react-slick';
import { useRef, useState } from 'react';
import IconButton from '@/components/IconButton';

import clsx from 'clsx';
import ProductCard from './productCard';
import Divider from './Divider';
import { ProductDetail } from '@/types/product';
import { useGetProduct } from '@/services/api/https/product';
import ProductListSkeleton from './Skeletons/ProductListSkeleton';
import { useTranslations } from 'next-intl';

interface RelatedProductsProps {
  className?: string;
  product: ProductDetail | null;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ className, product }) => {
  const { data: productData, isLoading: isLoadingProductData } = useGetProduct({
    page: 1,
    limit: 8,
    categoryId: product?.categoryId?._id || '',
  });

  const t = useTranslations('productDetail');

  const slider = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
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
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="dark:bg-dark-500 bg-gray-100 py-5">
      <div className="container">
        <h3 className="text-2xl font-semibold text-blue">{t('relatedProduct')}</h3>
        <Divider marginBottom="30px" />

        {isLoadingProductData ? (
          <ProductListSkeleton count={5} className="xl:!grid-cols-5 md:!grid-cols-3 !grid-cols-1 mt-3" />
        ) : (
          <section className={clsx('px-3', className)}>
            {(productData?.data?.products?.length || 0) > 1 ? (
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
                  {productData?.data?.products.map((item) => (
                    <div key={item._id} className="p-2">
                      <ProductCard data={item} className="dark!shadow-none !shadow-md" />
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-4">
                {productData?.data?.products.map((item) => (
                  <div className="xl:w-[18%] md:w-[32%] w-[90%]" key={item._id}>
                    <ProductCard data={item} className="dark!shadow-none !shadow-md" />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
