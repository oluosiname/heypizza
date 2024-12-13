"use client";

import { useState, ChangeEvent, useMemo } from "react";
import { useApi } from "../../hooks/useApi";
import { MenuItem } from "@types";
import SearchInput from "@/components/SearchInput";
import MenuItemCard from "@/components/MenuItemCard";
import SortByPrice from "@/components/SortByPrice";

const Menu = () => {
  const [filter, setFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};

    if (filter) {
      params["name"] = filter;
    }

    if (sortOrder == "") {
      return params;
    }

    params["sort_by"] = "price";
    params["sort_direction"] = sortOrder;
    return params;
  }, [filter, sortOrder]);

  const { data: menus, error } = useApi<MenuItem[]>("menus", queryParams);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  if (error) return <div>Error: {error}</div>;

  if (menus === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>

      <SearchInput filter={filter} onFilterChange={handleFilterChange} />

      <SortByPrice sortOrder={sortOrder} onSortOrderChange={handleSortChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menus.length === 0 ? (
          <div>No menus available matching the filter.</div>
        ) : (
          menus.map((menu: MenuItem) => (
            <MenuItemCard menu={menu} key={menu.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
