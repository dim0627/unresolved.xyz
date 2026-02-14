'use client';

import type { ReactNode } from 'react';
import '@styles/global.css';
import { Container } from '@components';
import Image from 'next/image';
import Link from 'next/link';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header className="mb-10 py-4">
          <Container>
            <Link
              href="/"
              className="flex items-center gap-4 font-semibold text-black text-xl tracking-widest hover:underline"
            >
              <Image
                src="/images/logo.png"
                alt="blog.unresolved.xyz"
                width={50}
                height={50}
              />
              blog.unresolved.xyz
            </Link>
          </Container>
        </header>
        <Container>{children}</Container>
        <footer className="mt-8 py-4">
          <Container fullWidth>
            <span className="text-neutral-500">
              &copy; {new Date().getFullYear()} blog.unresolved.xyz
            </span>
          </Container>
        </footer>
      </body>
    </html>
  );
}
