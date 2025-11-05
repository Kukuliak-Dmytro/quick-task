import type { FC } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// interface
interface IProps {
  children: React.ReactNode;
}

// component
export const UiProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props;

  //return
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
};
