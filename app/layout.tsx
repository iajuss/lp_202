import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJA - Presença intencional",
  description: "Perfumaria de autoria para quem trata a presença como escolha.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
