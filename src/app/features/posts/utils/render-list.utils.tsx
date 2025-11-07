import { ReactNode } from "react";
import { cn } from "@/app/shared/utils/utils";

//interface
interface RenderListOptions<T> {
  items: T[] | number;
  renderItem: (item: T, index: number) => ReactNode;
  gap?: number;
  className?: string;
}

//function
/**
 * Renders a list of items in a flex-col layout.
 */
export const renderList = <T,>({
  items,
  renderItem,
  gap = 24,
  className = "",
}: RenderListOptions<T>): ReactNode => {
  const itemsArray =
    typeof items === "number"
      ? Array.from({ length: items }, (_, i) => i as unknown as T)
      : items;

  const gapValue = typeof gap === "number" ? gap : 24;

  //return
  return (
    <div
      className={cn("flex flex-col", className)}
      style={{ gap: `${gapValue}px` }}>
      {itemsArray.map((item, index) => renderItem(item, index))}
    </div>
  );
};
