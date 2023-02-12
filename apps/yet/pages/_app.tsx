import type { AppProps } from "next/app";
import { Josefin_Sans } from "@next/font/google";
import "@styles/global.css";
import Script from "next/script";

const font = Josefin_Sans({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GQEKXQNCLH"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GQEKXQNCLH');
        `}
      </Script>
      <Component {...pageProps} />
    </main>
  );
}
