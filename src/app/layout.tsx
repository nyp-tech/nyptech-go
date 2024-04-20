import NavigationBar from "@/components/navigation-bar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TES Club",
  description: "The Go Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://kit.fontawesome.com/d0674de6ae.js"
          crossOrigin="anonymous"
          async
        />
      </head>
      <body className={font.className}>
        <div className={"h-dvh flex flex-col"}>
          <NavigationBar className={"flex-none"} />
          <div className={"flex-1"}>{children}</div>
        </div>
      </body>
    </html>
  );
}