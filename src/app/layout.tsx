import type { Metadata } from "next";
import "./globals.css";
import { getCurrentSession } from "@/lib/cookies";
import { redirect } from "next/navigation";
import { Noto_Sans_JP, Funnel_Display, Lato } from "next/font/google";

const funnelDisplay = Funnel_Display({
  weight: ["300", "400", "700"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-funnel-display",
});

const lato = Lato({
  weight: ["400", "700"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-lato",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["200", "400", "700"],
  style: ["normal"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "Slackwork",
  description: "Chatwork, but better",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getCurrentSession();
  if (!user) {
    redirect("/login/chatwork");
  }

  return (
    <html
      lang="en"
      className={`w-full h-full ${funnelDisplay.variable} ${notoSansJP.variable} ${lato.variable}`}
    >
      <body className={`antialiased w-full h-full`}>{children}</body>
    </html>
  );
}
