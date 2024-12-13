import { MenuItem } from "../../types/menu";

interface MenuItemCardProps {
  menu: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ menu }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-2">{menu.attributes.name}</h2>
      <p className="text-gray-700">Price: ${menu.attributes.price}</p>
    </div>
  );
};

export default MenuItemCard;
