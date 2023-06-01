import { FC } from "react";
import { Container } from "@components";
import Link from "next/link";

export const Header: FC = () => {
  return (
    <header className="py-6">
      <Container>
        <Link
          href="/"
          className="text-xl text-red-500 tracking-widest font-semibold"
        >
          blog.unresolved.xyz
        </Link>
      </Container>
    </header>
  );
};
