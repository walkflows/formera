import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { SavedPropertiesProvider } from "@/context/SavedPropertiesContext";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/config";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | A WALKFLOW real estate demo`,
    template: `%s | ${SITE_NAME} Demo`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport = {
  themeColor: "#f7f6f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        <SavedPropertiesProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <DemoBanner />
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </SavedPropertiesProvider>
      </body>
    </html>
  );
}
