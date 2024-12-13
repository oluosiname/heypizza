import { ChangeEvent } from "react";

interface SortByPriceProps {
  sortOrder: string;
  onSortOrderChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SortByPrice: React.FC<SortByPriceProps> = ({
  sortOrder,
  onSortOrderChange,
}) => {
  return (
    <div className="mb-4">
      <select
        value={sortOrder}
        onChange={onSortOrderChange}
        className="border border-gray-300 p-2 rounded-md"
      >
        <option value="">Sort by Price</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortByPrice;
