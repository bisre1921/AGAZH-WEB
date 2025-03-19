"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NavBar from "./components/NavBar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <NavBar />
          {children}
        </body>
      </html>
    </Provider>
  );
}
