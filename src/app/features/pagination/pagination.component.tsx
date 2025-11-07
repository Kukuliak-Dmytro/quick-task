"use client";

import { useTranslations } from "next-intl";
import { PAGINATION_LIMIT } from "./pagination.constants";
import { Button } from "@/app/shared/components/ui/button";

//interface
interface PaginationComponentProps {
  total: number;
  page: number;
  limit?: number;
  onPageChange?: (page: number) => void;
}

//component
/**
 * Pagination component for navigating through paginated content.
 */
export const PaginationComponent = ({
  total,
  page,
  limit = PAGINATION_LIMIT,
  onPageChange,
}: PaginationComponentProps) => {
  const t = useTranslations();
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange?.(newPage);
    }
  };

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
