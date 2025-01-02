"use client"; 

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store"; 
import Sidebar from "@/components/Sidebar";
import DarkModeToggle from "@/components/DarkmodeToggle";
import { usePathname } from "next/navigation"; 

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); 

  const hideSidebarPaths = ["/login"];

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <DarkModeToggle />
          {!hideSidebarPaths.includes(pathname) && <Sidebar />}
          {children}
        </Provider>
      </body>
    </html>
  );
}
