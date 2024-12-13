"use client";

import { useState, ChangeEvent, useMemo } from "react";
import { MenuItem } from "@types";
import SearchInput from "@/components/SearchInput";
import MenuItemCard from "@/components/MenuItemCard";
import SortByPrice from "@/components/SortByPrice";
import { usePagination, useApi } from "@/hooks";
import Pagination from "@/components/Pagination";

const Menu = () => {
  const [filter, setFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const { page, perPage, setPageNumber, setItemsPerPage } = usePagination();

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};

    if (filter) {
      params["name"] = filter;
    }

    params["page"] = String(page);
    params["per_page"] = String(perPage);

    if (sortOrder == "") {
      return params;
    }

    params["sort_by"] = "price";
    params["sort_direction"] = sortOrder;

    return params;
  }, [filter, sortOrder, perPage, page]);

  const { result, error } = useApi<MenuItem>("menus", queryParams);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  if (error) return <div>Error: {error}</div>;

  if (result === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>

      <SearchInput filter={filter} onFilterChange={handleFilterChange} />

      <SortByPrice sortOrder={sortOrder} onSortOrderChange={handleSortChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {result.data.length === 0 ? (
          <div>No menus available matching the filter.</div>
        ) : (
          result.data.map((menu: MenuItem) => (
            <MenuItemCard menu={menu} key={menu.id} />
          ))
        )}
      </div>

      <div className="flex justify-center mt-5 mb-5 absolute bottom-0 left-0 right-0">
        <Pagination
          currentPage={page}
          totalPages={result.total_pages}
          perPage={perPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default Menu;
