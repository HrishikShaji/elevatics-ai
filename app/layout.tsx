import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import ToggleSidebar from "./components/ToggleSidebar";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import { PromptProvider } from "./contexts/PromptContext";
import { QuickReportProvider } from "./contexts/QuickReportContext";
import SignInButton from "./components/SignInButton";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/UserContext";
import { SettingsProvider } from "./contexts/SettingsContext";

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
          <AuthProvider>
            <UserProvider>
              <SettingsProvider>
                <PromptProvider>
                  <QuickReportProvider>
                    <Modal />
                    <div className=" h-screen w-full flex">
                      <Sidebar />
                      <ToggleSidebar />
                      <SignInButton />
                      <div className="  w-full flex flex-col h-full">
                        <div className=" h-full w-full ">{children}</div>
                      </div>
                    </div>
                  </QuickReportProvider>
                </PromptProvider>
              </SettingsProvider>
            </UserProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
