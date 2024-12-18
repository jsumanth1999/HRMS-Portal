"use client"; // This ensures this component is a client component

import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/Sidebar"; // Ensure this is a client component if using Redux
import { Provider } from "react-redux";
import { store } from "@/store"; // Make sure your Redux store is correctly set up

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <Sidebar /> 
          {children}
        </Provider>
      </body>
    </html>
  );
}
