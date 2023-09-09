import { FC } from "react";
import { Container } from "@components";
import Link from "next/link";

export const Header: FC = () => {
  return (
    <header className="py-6">
      <Container>
        <Link
          href="/"
          className="text-xl font-semibold tracking-widest text-red-500"
        >
          blog.unresolved.xyz
        </Link>
      </Container>
    </header>
  );
};
