import "@devcraft-ts/abac-admin-react-ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientLayout } from "../components/ClientLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABAC Admin - Policy Management",
  description: "Manage your Attribute-Based Access Control policies with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
