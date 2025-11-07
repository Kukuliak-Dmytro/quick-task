"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button } from "@/app/shared/components/ui/button";
import { usePaginationStore } from "./pagination.store";

//interface
interface IPaginationComponentProps {
  total: number;
  page?: number;
  limit?: number;
}

//component
/** Pagination component that uses the pagination store for page management. */
export const PaginationComponent = ({
  total: totalProp,
  page: pageProp,
  limit: limitProp,
}: IPaginationComponentProps) => {
  const t = useTranslations();

  // Use pagination store for pagination state
  const storePage = usePaginationStore((state) => state.page);
  const storeLimit = usePaginationStore((state) => state.limit);
  const storeTotal = usePaginationStore((state) => state.total);
  const setPage = usePaginationStore((state) => state.setPage);
  const setTotal = usePaginationStore((state) => state.setTotal);

  // Use store values, fall back to props if store values are defaults
  const page = storePage || pageProp || 1;
  const limit = storeLimit || limitProp || 5;
  const total = storeTotal || totalProp;

  // Update total in store if prop is provided
  useEffect(() => {
    if (totalProp && storeTotal !== totalProp) {
      setTotal(totalProp);
    }
  }, [totalProp, storeTotal, setTotal]);

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(total / limit);
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) {
    return null;
  }

  //return
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        variant="outline"
        size="sm">
        {t("pagination_previous")}
      </Button>

      <span className="px-3 py-2 text-sm text-muted-foreground">
        {t("pagination_page")} {page} {t("pagination_of")} {totalPages}
      </span>

      <Button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
        variant="outline"
        size="sm">
        {t("pagination_next")}
      </Button>
    </div>
  );
};
