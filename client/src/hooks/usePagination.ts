import { useState, useCallback } from "react";

export const usePagination = (
  initialPage: number = 1,
  initialPerPage: number = 20
) => {
  const [page, setPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPerPage);

  const setPageNumber = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  const setItemsPerPage = useCallback((perPage: number) => {
    setPerPage(perPage);
    setPage(1);
  }, []);

  return {
    page,
    perPage,
    setPageNumber,
    setItemsPerPage,
  };
};
