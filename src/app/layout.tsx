import type { Metadata } from "next";
import { Caveat, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uddipon | Together for a Better Tomorrow",
  description:
    "Uddipon is a community platform to create, join and support local social events. Connect, participate, create impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${caveat.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col bg-[#f7faf4] font-sans text-[#12301f]">
       <Navbar/>
        {children}
        <Footer/>

      </body>
    </html>
  );
}
