interface AvatarMenuProps {}

const AvatarMenu = ({}: AvatarMenuProps) => {
  const menuItems: string[] = ['Profile', 'Settings', 'Logout'];
  return (
    <ul className="py-2">
      {menuItems.map((item, index) => (
        <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default AvatarMenu;
