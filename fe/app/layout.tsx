import type { Metadata } from "next";
import { AuthProvider } from "./component/auth-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "",
  description: " ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
