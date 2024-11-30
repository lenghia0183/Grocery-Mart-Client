import images from "@/asset/images";
import Image from "./Image";

function Logo(): JSX.Element {
  return (
    <div className="flex items-center gap-4 text-2xl font-semibold text-dark-500">
      <Image
        width={35}
        height={35}
        src={images.logo}
        alt="Grocery Mart Logo - A modern online grocery store"
        title="Grocery Mart Logo"
      />
      <h1>Grocery Mart</h1>
    </div>
  );
}
export default Logo;
