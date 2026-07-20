import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import '@styles/global.css';
import { Container } from '@components';

export const metadata: Metadata = {
  metadataBase: new URL('https://yet.unresolved.xyz'),
  title: 'dtsuji@dim0627 - Portfolio',
  description: 'Portfolio of Daisuke Tsuji, Software Developer.',
  openGraph: {
    siteName: 'dtsuji@dim0627 - Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@dim0627',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-xl leading-normal">
        <header className="py-4">
          <Container>
            <Link
              href="/"
              className="flex items-center gap-4 font-semibold text-xl tracking-widest hover:underline"
            >
              <Image
                src="/images/logo.svg"
                alt="yet.unresolved.xyz"
                width={50}
                height={50}
              />
              yet.unresolved.xyz
            </Link>
          </Container>
        </header>
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
