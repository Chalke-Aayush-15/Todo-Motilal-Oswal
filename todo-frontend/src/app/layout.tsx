// import ".";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITs-TODO-App",
  description: "Lets make ur work easier with this todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
