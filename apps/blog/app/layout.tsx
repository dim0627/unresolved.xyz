'use client';

import type { ReactNode } from 'react';
import '@styles/global.css';
import { Container } from '@components';
import Link from 'next/link';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header className="py-4">
          <Container fullWidth>
            <Link
              href="/"
              className="font-semibold text-black text-xl tracking-widest"
            >
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
