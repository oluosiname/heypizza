import { ChangeEvent } from "react";

interface SearchInputProps {
  filter: string;
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  filter,
  onFilterChange,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={filter}
        onChange={onFilterChange}
        className="border border-gray-300 p-2 rounded-md w-full"
      />
    </div>
  );
};

export default SearchInput;
