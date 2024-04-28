import { getLocalUser } from "@/functions/users";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const DashboardNavbar = async () => {
  const user = await getLocalUser();
  const activePath: any = "andalksdlaskdlakdjalskdjalksdj";

  return (
    <header className="bg-theme-400">
      <div className="py-10 bg-theme-400 container flex items-center justify-between">
        <Image
          src="/images/brand/logo-white.png"
          width={77}
          height={42}
          alt="Logo"
        />
        <h1 className="text-white">
          Logado como <b>{user.full_name}</b>
        </h1>
      </div>
      <div className="bg-theme-500 py-4">
        <div className="container flex items-center justify-between">
          <ul className="flex gap-8">
            <li
              className={`text-white text-lg ${
                activePath === "/panel" ? "font-semibold" : ""
              }`}
            >
              <Link href="/panel">Usuários</Link>
            </li>
            <li
              className={`text-white text-lg ${
                !!activePath && activePath.includes("/panel/projects")
                  ? "font-semibold"
                  : ""
              }`}
            >
              <Link href="/panel/projects">Projetos</Link>
            </li>
            <li
              className={`text-white text-lg ${
                !!activePath && activePath.includes("/panel/testimonials")
                  ? "font-semibold"
                  : ""
              }`}
            >
              <Link href="/panel/testimonials">Testemunhas</Link>
            </li>
            <li
              className={`text-white text-lg ${
                !!activePath && activePath.includes("/panel/portfolio")
                  ? "font-semibold"
                  : ""
              }`}
            >
              <Link href="/panel/portfolio">Portfolio</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
