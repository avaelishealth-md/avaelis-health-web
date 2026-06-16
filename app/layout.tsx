import type { Metadata } from "next";
import Script from "next/script";

const GA_ID = "G-WQ49M7VJZE";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://avaelishealth.com.au";
const TITLE = "AvaElis Health · Longevity Clinic";
const DESCRIPTION =
  "More years thriving, less years declining. A boutique longevity practice with Dr. Danny Cai.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "AvaElis Health",
    locale: "en_AU",
    type: "website",
    images: [{ url: "/assets/danny-about-hero.jpg", alt: "Dr. Danny Cai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/danny-about-hero.jpg"],
  },
  // Pre-launch draft on a temporary domain, keep search engines out until the real go-live on avaelishealth.com.au, then remove this.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Albert+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}
