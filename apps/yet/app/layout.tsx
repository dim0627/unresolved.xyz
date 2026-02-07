import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import Script from 'next/script';
import '@styles/global.css';

const font = Josefin_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'dtsuji@dim0627 - Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
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
          {children}
        </main>
      </body>
    </html>
  );
}
