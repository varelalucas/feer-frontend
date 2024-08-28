"use client";

import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <footer className="bg-theme-500 py-9">
        <div className="container flex items-center justify-between flex-col lg:flex-row gap-10 lg:gap-0 text-center lg:text-left">
          <Image
            width={77}
            height={44}
            src="/images/brand/logo-white.png"
            alt="Logo branca"
          />
          <ul className="flex flex-col lg:flex-row items-center gap-7 font-medium text-white">
            <li>
              <Link href="/projetos/disponiveis">Projetos Disponíveis</Link>
            </li>
            <li>
              <Link href="/projetos/futuros">Projetos Futuros</Link>
            </li>
            <li>
              <Link href="/portfolio">Portfólio</Link>
            </li>
          </ul>
          <div className="text-right flex flex-col items-center lg:items-end">
            <div className="flex text-white items-center gap-2">
              <Link href="https://instagram.com/feerconstrutora">
                <Instagram />
              </Link>
            </div>
            <span className="text-[10px] text-white mt-3">
              Todos os direitos reservados ©
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};
