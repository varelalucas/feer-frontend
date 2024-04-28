"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const MobileNavbar = ({ dark }: { dark?: boolean }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavClosing, setIsNavClosing] = useState(false);

  const handleToggleNavbar = () => {
    if (isNavOpen) {
      setIsNavClosing(true);

      setTimeout(() => {
        setIsNavClosing(false);
        setIsNavOpen(false);
      }, 200);
    } else {
      setIsNavOpen(true);
    }
  };

  return (
    <>
      <nav className="block lg:hidden">
        <div className="container flex mx-auto items-center justify-between">
          <Link href="/">
            <Image
              src="/images/brand/icon.png"
              width={95}
              height={69}
              alt="Logo"
            />
          </Link>
          <button
            className={`${dark ? "text-black" : "text-white"}`}
            onClick={handleToggleNavbar}
          >
            <Menu size={32} />
          </button>
        </div>
      </nav>
      <div
        className={`bg-black bg-opacity-30 fixed top-0 bottom-0 right-0 left-0 flex z-[1000] ${
          isNavOpen ? "block" : "hidden"
        }`}
      >
        <div
          className={`fixed top-0 left-0 bottom-0 w-[80vw] bg-theme-400 z-10 p-10 rounded-tr-xl rounded-br-xl flex flex-col justify-between navbar ${
            isNavClosing ? "closing" : ""
          }`}
          onClick={() => {}}
        >
          <div className="flex items-center justify-between">
            <Image
              src="/images/brand/logo-white.png"
              width={77}
              height={64}
              alt="Logo white"
            />
            <button onClick={handleToggleNavbar}>
              <X size={32} color="#fff" />
            </button>
          </div>
          <ul className="flex gap-10 flex-col text-xl text-white font-medium">
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
          <div>
            <Link href="/whatsapp">
              <Button variant="outline" size="lg" className="text-xl w-full">
                Fale conosco
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full h-full" onClick={handleToggleNavbar}></div>
      </div>
    </>
  );
};
