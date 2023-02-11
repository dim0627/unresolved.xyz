import type { AppProps } from "next/app";
import { Josefin_Sans } from "@next/font/google";
import "@styles/global.css";

const font = Josefin_Sans({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={font.className}>
      <Component {...pageProps} />
    </main>
  );
}
