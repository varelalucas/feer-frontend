import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { MobileNavbar } from "./MobileNavbar";

export const Navbar = ({ dark }: { dark?: boolean }) => {
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
          </div>
          <Link href="/whatsapp">
            <Button size="lg">Fale conosco</Button>
          </Link>
        </div>
      </nav>
      <MobileNavbar dark={dark} />
    </>
  );
};
