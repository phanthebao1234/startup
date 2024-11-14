import type { Metadata } from "next";
import "../../styles/globals.css";
import { Navbar, Footer } from "@/components/common"

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
