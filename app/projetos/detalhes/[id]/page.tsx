import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { ImagesMarquee } from "@/components/projects/Marquee";
import { ProjectsCard } from "@/components/projects/ProjectsCard";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/functions/projects";
import { Bath, Bed, CarFront, Cat, Ruler, ShowerHead } from "lucide-react";
import Link from "next/link";

import { CarouselClient } from "@/components/projects/Carousel";
import { ModalGallery } from "@/components/projects/ModalGallery";

export async function generateStaticParams() {
  const projects = await getAllProjects({}, 0, 10000);

  if (!!projects && !!projects.data) {
    return projects.data.map((project) => {
      return {
        id: project.id.toString(),
      };
    });
  }

  return [{ id: "0" }];
}

export default async function DetailsProject({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const selectedShow = (searchParams?.show || "photos") as string;
  const modal = (searchParams?.show || "false") as string;
  const image = (searchParams?.image || "") as string;

  const { id } = params;

  const { data: project } = await getAllProjects({ id: parseInt(id) }, 0, 1);
  const projects = await getAllProjects(
    {
      NOT: {
        id: parseInt(id),
      },
      st_disponibility: !!project ? project[0].st_disponibility : false,
      type_project: !!project ? project[0].type_project : "ALUGUEL",
    },
    0,
    3
  );

  return (
    <>
      <header className="py-10">
        <Navbar dark />
      </header>
      <main>
        {!!project && project.length > 0 ? (
          <>
            {project[0].arr_photos.length + project[0].arr_drawings.length >
              0 && (
              <div className="relative">
                <CarouselClient
                  project={project[0]}
                  selectedShow={selectedShow}
                />
                <ModalGallery
                  images={[
                    ...project[0].arr_photos,
                    ...project[0].arr_drawings,
                  ]}
                />
              </div>
            )}
            <div className="mt-8 container">
              <div className="flex items-center gap-8 mb-[50px]">
                {project[0].arr_photos.length > 0 && (
                  <Link
                    href={`?${new URLSearchParams({
                      show: "photos",
                    })}`}
                  >
                    <Button
                      variant={
                        selectedShow === "photos" ? "default" : "outline"
                      }
                      size="lg"
                      className="text-xl"
                    >
                      Fotos
                    </Button>
                  </Link>
                )}
                {project[0].arr_drawings.length > 0 && (
                  <Link
                    href={`?${new URLSearchParams({
                      show: "drawings",
                    })}`}
                  >
                    <Button
                      variant={
                        selectedShow === "drawings" ? "default" : "outline"
                      }
                      size="lg"
                      className="text-xl"
                    >
                      Plantas
                    </Button>
                  </Link>
                )}
                {project[0].arr_videos.length > 0 && (
                  <Link
                    href={`?${new URLSearchParams({
                      show: "videos",
                    })}`}
                  >
                    <Button
                      variant={
                        selectedShow === "videos" ? "default" : "outline"
                      }
                      size="lg"
                      className="text-xl"
                    >
                      Vídeos
                    </Button>
                  </Link>
                )}
              </div>
              <div className="flex max-lg:flex-col mb-10">
                <div className="lg:border-r lg:first-letter:border-theme-600 basis-1/2 max-lg:basis-[100%]">
                  <div className="mb-[60px]">
                    <h1 className="text-[50px] font-bold text-theme-400 max-lg:text-4xl">
                      {project[0].val_project
                        .toLocaleString("pt-br", {
                          currency: "BRL",
                          style: "currency",
                        })
                        .replace(",00", "")}
                    </h1>
                    <p className="text-theme-600 mt-1 max-lg:text-sm">
                      {!!project[0].val_condominium &&
                        `Condomínio ${project[0].val_condominium
                          .toLocaleString("pt-br", {
                            currency: "BRL",
                            style: "currency",
                          })
                          .replace(",00", "")} - `}
                      IPTU{` `}
                      {project[0].val_iptu
                        .toLocaleString("pt-br", {
                          currency: "BRL",
                          style: "currency",
                        })
                        .replace(",00", "")}
                    </p>
                  </div>
                  <div className="mb-[60px]">
                    <h1 className="text-[28px] max-lg:text-lg font-semibold text-theme-800">
                      {project[0].nm_project}
                    </h1>
                    <p className="text-xl max-lg:text-sm text-theme-600">
                      {project[0].address_project}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    <div className="flex items-start gap-3">
                      <p className="text-theme-400">
                        <Ruler size={32} />
                      </p>
                      <div>
                        <h3 className="text-xl font-semibold text-theme-800 max-lg:text-lg">
                          Área
                        </h3>
                        <p className="text-lg max-lg:text-sm text-theme-600">
                          {project[0].val_area}m²
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <p className="text-theme-400">
                        <Bed size={32} />
                      </p>
                      <div>
                        <h3 className="text-xl max-lg:text-lg font-semibold text-theme-800">
                          Quartos
                        </h3>
                        <p className="text-lg max-lg:text-sm text-theme-600">
                          {project[0].num_bedrooms}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <p className="text-theme-400">
                        <ShowerHead size={32} />
                      </p>
                      <div>
                        <h3 className="text-xl max-lg:text-lg font-semibold text-theme-800">
                          Banheiros
                        </h3>
                        <p className="text-lg max-lg:text-sm text-theme-600">
                          {project[0].num_bathrooms}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <p className="text-theme-400">
                        <Bath size={32} />
                      </p>
                      <div>
                        <h3 className="text-xl max-lg:text-lg font-semibold text-theme-800">
                          Suítes
                        </h3>
                        <p className="text-lg max-lg:text-sm text-theme-600">
                          {project[0].num_suits}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <p className="text-theme-400">
                        <Cat size={32} />
                      </p>
                      <div>
                        <h3 className="text-xl max-lg:text-lg font-semibold text-theme-800">
                          Aceita Pets?
                        </h3>
                        <p className="text-lg max-lg:text-sm text-theme-600">
                          {project[0].pet_friendly ? "Sim" : "Não"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <p className="text-theme-400">
                        <CarFront size={32} />
                      </p>
                      <div>
                        <h3 className="text-xl max-lg:text-lg font-semibold text-theme-800">
                          Vagas
                        </h3>
                        <p className="text-lg max-lg:text-sm text-theme-600">
                          {project[0].num_garage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-10 md:mt-0 basis-1/2 max-lg:basis-[100%]">
                  <div className="max-w-[588px]">
                    <div>
                      <h1 className="text-2xl font-semibold text-theme-700">
                        Sobre o imóvel
                      </h1>
                      <p className="text-xl text-theme-600 mt-3">
                        {project[0].ds_project}
                      </p>
                    </div>
                    <div className="py-[65px] px-[31px] border-2 border-theme-500 flex flex-col lg:flex-row gap-5 xl:gap-0 items-center justify-between mt-5">
                      <h1 className="text-2xl font-bold text-theme-500 max-w-[276px] text-center">
                        Gostou desse imóvel? Ele pode ser seu!
                      </h1>
                      <Link href="/whatsapp">
                        <Button
                          size="lg"
                          variant="secondary"
                          className="text-xl"
                        >
                          Contate-nos
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {!!projects.data && projects.data.length > 0 && (
                <div>
                  <h1 className="text-4xl text-theme-700 font-semibold">
                    Veja também:
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[34px] mt-[32px] mb-[150px]">
                    {projects.data.map((project) => {
                      return (
                        <ProjectsCard key={project.id} project={project} />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-screen h-[680px]">
            <h1>Infelizmente não conseguimos encontrar esse projeto</h1>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
