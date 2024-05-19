import "./globals.css";
import { Inter } from "next/font/google";

import ToasterProvider from "@/components/providers/Toaster-provider";
import ConfettiProvider from "@/components/providers/ConfettiProvider";
import { AuthProvider } from "./Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart-Learn",
  description: "Generated by Smart-Learn",
};

export default function RootLayout({ children }) {
  return (
    // <ClerkProvider>
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToasterProvider />
          {children}
        </body>
      </html>
    </AuthProvider>
    // </ClerkProvider>
  );
}
