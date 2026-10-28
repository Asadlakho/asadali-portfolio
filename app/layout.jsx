import "./globals.css";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { site } from "../lib/data";
import Script from "next/script";
import ScrollToTop from "../components/ScrollToTop";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--f-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--f-body",
  display: "swap",
});

const title = `${site.name} | Junior Full Stack Developer (MERN)`;

const description =
  "Junior Full Stack Developer from Pakistan building MERN stack apps with React, Node.js, Express and MongoDB. Open to junior roles and freelance projects.";

export const metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: [
    "Asad Ali Lakho",
    "Full Stack Developer",
    "MERN Stack",
    "React Developer",
    "Node.js",
    "MongoDB",
    "Portfolio",
    "Pakistan",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#0E1412",
};

const themeScript = `try {
  var t = localStorage.getItem("theme");
  if (!t && window.matchMedia("(prefers-color-scheme: light)").matches) {
    t = "light";
  }
  if (t) {
    document.documentElement.setAttribute("data-theme", t);
  }
} catch (e) {}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressCountry: "PK",
  },
  sameAs: [site.linkedin, site.github].filter(Boolean),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Script id="theme-script" strategy="beforeInteractive">
          {themeScript}
        </Script>

        {children}

        <ScrollToTop />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </body>
    </html>
  );
}