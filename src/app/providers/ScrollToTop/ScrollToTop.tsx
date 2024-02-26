"use client"
import { useIsClient } from "@shared/hooks/useIsClient";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export const ScrollToTop = ({ children }: PropsWithChildren) => {
  const isClient = useIsClient();
  const path = usePathname();

  useEffect(() => {
    if (isClient) {
      document.querySelector("#root")?.scrollTo(0, 0)
    }
  }, [isClient, path])

  return children;
}