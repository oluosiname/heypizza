import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  perPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between my-6 gap-5">
      <div className="flex items-center space-x-2">
        <span>Items per page:</span>
        <select
          value={perPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border px-2 py-1 rounded-md"
        >
          {[5, 10, 15, 20].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
