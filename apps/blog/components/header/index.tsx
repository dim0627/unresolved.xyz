import { Container } from '@components';
import Link from 'next/link';
import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <header className="py-6">
      <Container>
        <Link
          href="/"
          className="font-semibold text-red-500 text-xl tracking-widest"
        >
          blog.unresolved.xyz
        </Link>
      </Container>
    </header>
  );
};
