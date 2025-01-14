import images from '@/asset/images';
import Image from './Image';
import Link from 'next/link';

function Logo(): JSX.Element {
    return (
        <Link
            href="/"
            className="flex items-center gap-3 text-2xl font-semibold text-dark-500 select-none"
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
