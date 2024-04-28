import { type Project } from "@/functions/projects";
import Link from "next/link";

export const ProjectsCard = ({ project }: { project: Project }) => {
  return (
    <Link
      className="rounded-lg overflow-hidden"
      href={`/projetos/detalhes/${project.id}`}
    >
      <img className="aspect-video" src={project.arr_photos[0]} />
      <div className="py-3 px-5 bg-[#F9F9F9]">
        <div className="flex items-center gap-1">
          <svg
            width="28"
            height="17"
            viewBox="0 0 28 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.666626 16.25V0.75H27.3333V16.25H0.666626ZM3.33329 13.6667H24.6666V3.33333H20.6666V8.5H18V3.33333H15.3333V8.5H12.6666V3.33333H9.99996V8.5H7.33329V3.33333H3.33329V13.6667Z"
              fill="#ED3237"
            />
          </svg>
          <span>{project.val_area}m²</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-theme-400">
          {project.nm_project}
        </h1>
        <p className="py-1 text-theme-600">{project.address_project}</p>
        <span className="uppercase text-theme-400 underline">Saiba mais</span>
      </div>
    </Link>
  );
};
