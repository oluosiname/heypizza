"use client";

import { useState, ChangeEvent, useMemo } from "react";
import { useApi } from "../../hooks/useApi";
import { MenuItem } from "@types";
import SearchInput from "@/components/SearchInput";
import MenuItemCard from "@/components/MenuItemCard";

const Menu = () => {
  const [filter, setFilter] = useState<string>("");

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};

    if (filter) {
      params["name"] = filter;
    }

    return params;
  }, [filter]);

  const { data: menus, error } = useApi<MenuItem[]>("menus", queryParams);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  if (error) return <div>Error: {error}</div>;

  if (menus === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>

      <SearchInput filter={filter} onFilterChange={handleFilterChange} />

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