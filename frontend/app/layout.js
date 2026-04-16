import { Roboto  } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans", // ✅ IMPORTANT FIX
});

export const metadata = {
  title: 'GEM Connect - Connect with GEM Portal Experts',
  description: 'Connect businesses with expert GEM portal freelancers. Simplifying government e-marketplace operations.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
