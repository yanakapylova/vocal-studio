'use client'

import { Provider } from "react-redux";
import "./globals.scss";
import { store } from "./store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <div className="App">{children}</div>
        </body>
      </html>
    </Provider>
  );
}
