import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "next-client-cookies/server";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feer Construtora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <title>Feer Construtora</title>
        <meta name="title" content="Feer Construtora" />
        <meta
          name="description"
          content="CONSTRUÇÃO CIVIL - INCORPORAÇÃO IMOBILIÁRIA

A chave dos seus sonhos está te esperando!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://feerconstrutora.com/" />
        <meta property="og:title" content="Feer Construtora" />
        <meta
          property="og:description"
          content="CONSTRUÇÃO CIVIL - INCORPORAÇÃO IMOBILIÁRIA

A chave dos seus sonhos está te esperando!"
        />
        <meta
          property="og:image"
          content="https://metatags.io/images/meta-tags.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://feerconstrutora.com/" />
        <meta property="twitter:title" content="Feer Construtora" />
        <meta
          property="twitter:description"
          content="CONSTRUÇÃO CIVIL - INCORPORAÇÃO IMOBILIÁRIA

A chave dos seus sonhos está te esperando!"
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/images/meta-tags.png"
        />
      </head>
      <body className={montserrat.className}>
        <CookiesProvider>
          {children}
          <Toaster />
        </CookiesProvider>
      </body>
    </html>
  );
}
