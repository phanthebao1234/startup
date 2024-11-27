import '@/styles/globals.css';
import type { Metadata } from "next";

import Provider from '@/redux/providers';
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Setup } from '../components/utils';

export const metadata: Metadata = {
  title: "Full Auth",
  description: "Full auth application frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Provider>
          <Navbar />
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-8"></div>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
