import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex justify-center py-8">
      <p>&copy; {new Date().getFullYear()} blog.unresolved.xyz</p>
    </footer>
  );
};
