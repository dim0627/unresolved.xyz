import type { Metadata } from 'next';
import Script from 'next/script';
import '@styles/global.css';

export const metadata: Metadata = {
  title: 'dtsuji@dim0627 - Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-xl leading-normal">
        <main>
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
