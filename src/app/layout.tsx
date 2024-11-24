import type { Metadata } from "next";
import "@/styles/globals.css";

import Provider from '@/redux/providers';
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

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
