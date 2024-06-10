import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import ToggleSidebar from "./components/ToggleSidebar";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider>
          <Modal />
          <div className="flex h-screen">
            <Sidebar />
            <ToggleSidebar />
            <div className="flex flex-col w-full h-full">
              <Navbar />
              <div className=" h-full">{children}</div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
