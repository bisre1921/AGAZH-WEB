"use client"; // This is required for Next.js 13+

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
