import images from '@/asset/images';
import Image from './Image';
import clsx from 'clsx';
import { PATH } from '@/constants/path';
import { Link } from '@/i18n/routing';

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps): JSX.Element {
  return (
    <Link
      href={PATH.HOME}
      className={clsx(
        'flex items-center gap-3 text-2xl font-semibold text-dark-500 dark:text-white-200 select-none',
        className,
      )}
      title="Grocery Mart Logo"
    >
      <Image
        width={35}
        height={35}
        src={images.logo}
        alt="Grocery Mart Logo - A modern online grocery store"
        title="Grocery Mart Logo"
        quality={100}
        priority={true}
        loading={'eager'}
      />
      <h1>Gocerymart</h1>
    </Link>
  );
}

Logo.displayName = 'Logo';
export default Logo;
