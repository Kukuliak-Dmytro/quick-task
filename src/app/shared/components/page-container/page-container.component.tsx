import { FC, ReactNode } from "react";

import { cn } from "@/app/shared/utils/utils";

// interface
interface IPageContainerProps {
  children: ReactNode;
  className?: string;
}

// component
export const PageContainer: FC<Readonly<IPageContainerProps>> = (props) => {
  const { children, className = "" } = props;

  // return
  return <div className={cn("mx-auto my-8", className)}>{children}</div>;
};
