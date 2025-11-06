"use client";

import { FC, useEffect } from "react";
import { scan } from "react-scan";

//interface
interface IProps {
  isDev: boolean;
}

//component
/**
 * ScanComponent for React Scan integration.
 */
export const ScanComponent: FC<Readonly<IProps>> = (props) => {
  const { isDev } = props;

  useEffect(() => {
    if (isDev) {
      scan({
        trackUnnecessaryRenders: true,
        showToolbar: isDev,
        enabled: isDev,
      });
    }
  }, [isDev]);

  //return
  return null;
};
