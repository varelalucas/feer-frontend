"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { MobileNavbar } from "./MobileNavbar";
import { usePathname } from "next/navigation";

export const Navbar = ({ dark }: { dark?: boolean }) => {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden lg:block">
        <div className="container flex mx-auto items-center justify-between">
          <div className="flex items-center gap-20">
            <Link href="/">
              <Image
                src="/images/brand/icon.png"
                width={95}
                height={69}
                alt="Logo"
              />
            </Link>
            <ul
              className={`flex items-center gap-10 text-lg font-medium ${
                dark ? "text-black" : "text-white"
              }`}
            >
              <li
                className={
                  pathname.includes("/projetos/disponiveis")
                    ? "text-theme-400 font-bold transition-all"
                    : "hover:text-theme-400 transition-all"
                }
              >
                <Link href="/projetos/disponiveis">Projetos Disponíveis</Link>
              </li>
              <li
                className={
                  pathname.includes("/projetos/futuros")
                    ? "text-theme-400 font-bold transition-all"
                    : "hover:text-theme-400 transition-all"
                }
              >
                <Link href="/projetos/futuros">Projetos Futuros</Link>
              </li>
              <li
                className={
                  pathname.includes("/portfolio")
                    ? "text-theme-400 font-bold transition-all"
                    : "hover:text-theme-400 transition-all"
                }
              >
                <Link href="/portfolio">Portfólio</Link>
              </li>
            </ul>
          </div>
          <Link href="/whatsapp" target="_blank">
            <Button className="text-2xl px-[30px] py-[15px] h-[45px] rounded-sm bg-theme-500">
              Fale conosco
            </Button>
          </Link>
        </div>
      </nav>
      <MobileNavbar dark={dark} />
    </>
  );
};
