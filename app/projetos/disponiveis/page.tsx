import { Navbar } from "@/components/home/Navbar";
import { Selector } from "@/components/projects/Selector";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/functions/projects";
import Link from "next/link";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Footer } from "@/components/home/Footer";
import { ProjectsCard } from "@/components/projects/ProjectsCard";

export default async function DisponibleProjects({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const selectedType = (searchParams?.type || "COMPRA") as string;
  const selectedPage = (searchParams?.page || "0") as string;

  const projects = await getAllProjects(
    { type_project: selectedType, st_disponibility: true },
    parseInt(selectedPage),
    12
  );

  return (
    <>
      <header className="py-10">
        <Navbar dark />
      </header>
      <main className="mt-[88px] container">
        <div>
          <div className="text-theme-700 font-semibold text-3xl mb-4">
            {projects.total} Projetos Disponíveis
          </div>
          <div className="flex items-center gap-8 mb-[50px]">
            <Link
              href={`?${new URLSearchParams({
                page: "0",
                type: "COMPRA",
              })}`}
            >
              <Button
                variant={selectedType === "COMPRA" ? "default" : "outline"}
                size="lg"
                className="text-xl"
              >
                COMPRA
              </Button>
            </Link>
            <Link
              href={`?${new URLSearchParams({
                page: "0",
                type: "ALUGUEL",
              })}`}
            >
              <Button
                variant={selectedType === "ALUGUEL" ? "default" : "outline"}
                size="lg"
                className="text-xl"
              >
                ALUGUEL
              </Button>
            </Link>
          </div>
        </div>
        <div className="mb-10">
          {!!projects.data && projects.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[34px]">
              {projects.data.map((project) => {
                return <ProjectsCard key={project.id} project={project} />;
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center text-center">
              <p>Nenhum projeto foi encontrado com esse filtro</p>
            </div>
          )}
        </div>
        <div className="mb-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?${new URLSearchParams({
                    page: `${
                      parseInt(selectedPage) - 1 < 0
                        ? 0
                        : parseInt(selectedPage) - 1
                    }`,
                    type: selectedType,
                  })}`}
                />
              </PaginationItem>
              {Array.from({
                length: Math.ceil((projects.total || 12) / 12) || 1,
              }).map((item, index) => {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={`?${new URLSearchParams({
                        page: `${index}`,
                        type: selectedType,
                      })}`}
                      isActive={parseInt(selectedPage) === index}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  href={`?${new URLSearchParams({
                    page: `${
                      parseInt(selectedPage) + 1 >
                      Math.ceil((projects.total || 12) / 12) - 1
                        ? parseInt(selectedPage)
                        : parseInt(selectedPage) + 1
                    }`,
                    type: selectedType,
                  })}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      <Footer />
    </>
  );
}
