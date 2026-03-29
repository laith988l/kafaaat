import type { Metadata } from "next";
import { Be_Vietnam_Pro, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { Toaster } from "sonner";
import { createClient } from "@/utils/supabase/server";
import { SaleBanner } from "@/components/SaleBanner";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Kafaaat Academy",
  description: "The Golden Bridge - German Academy",
};

import { getBannerSettings, getCourses } from "./actions";

async function TopBannerWrapper() {
  const config = await getBannerSettings();
  
  return <SaleBanner 
    active={config.isActive} 
    message={config.message} 
    description={config.description} 
    discountPercentage={config.discountPercentage} 
  />;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getBannerSettings();
  const courses = await getCourses();
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,-50..200,20..48&display=block" rel="stylesheet" />
      </head>
      <body
        className={`${beVietnamPro.variable} ${manrope.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <Navbar bannerConfig={config} user={user} />
        <main className="flex-1">
          {children}
        </main>
        <WhatsAppButton />
        <Footer courses={courses} />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}


