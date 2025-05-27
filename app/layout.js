import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "New Life",
  description: "Site web multi-pages créé avec Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="App">
          <Navbar />
          <div className="content">{children}</div>
          <div className="home-page-footer">
          <p>© 2025 New Life. Tous droits réservés.</p>
        </div>
        </div>
      </body>
    </html>
  );
}
