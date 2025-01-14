import { StaticImageData } from 'next/image';
import logo from './logo.png';
import fallBack from './fallBack.avif';

type Images = {
  [key: string]: StaticImageData;
};

const images: Images = {
  logo: logo,
  fallBack: fallBack,
};

export default images;
