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
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
