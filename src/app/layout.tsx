import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/Footer/Footer";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Bounce, ToastContainer } from 'react-toastify';
import Cart from "@/context/Cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerce App [My Store]",
  description: "Shop the latest trends with ease. Enjoy great deals, fast shipping, and a seamless checkout experience!",
  keywords: "products, cart, shopping, store, shop, checkout, payment, buy, category, add, sale, price"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Cart>
              <Header />
              {children}
              <Footer />
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Bounce}
              />
            </Cart>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
