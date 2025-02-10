import { StaticImageData } from 'next/image';
import logo from './logo.png';
import fallBack from './fallBack.avif';
import banner1 from './banner1.png';
import banner2 from './banner2.jpg';
import banner3 from './banner3.jpg';
import login from './login.png';
import gift from './gift.png';
type Images = {
  [key: string]: StaticImageData;
};

const images: Images = {
  logo: logo,
  fallBack: fallBack,
  banner1: banner1,
  banner2: banner2,
  banner3: banner3,
  login: login,
  gift: gift,
};

export default images;
