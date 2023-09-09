"use client";

import { ReactNode } from "react";
import "@styles/global.css";
import { Container } from "@components";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header className="py-4">
          <Container fullWidth>
            <Link
              href="/"
              className="text-xl font-semibold tracking-widest text-red-500"
            >
              blog.unresolved.xyz
            </Link>
          </Container>
        </header>
        <Container>{children}</Container>
        <footer className="mt-8 py-4">
          <Container fullWidth>
            <span className="text-slate-500">
              &copy; {new Date().getFullYear()} blog.unresolved.xyz
            </span>
          </Container>
        </footer>
      </body>
    </html>
  );
}
