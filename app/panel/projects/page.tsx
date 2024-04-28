import { listProjectsColumns } from "@/components/panel/projects/columns";
import { DataTable } from "@/components/panel/data-table";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/functions/projects";
import { ModalNewProject } from "@/components/panel/projects/ModalNewProject";
import { cookies } from "next/headers";

export default async function ProjectsDashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth:token");

  const projects = await getAllProjects({}, 0, 1000);

  const projectBase = {
    val_project: 0,
    val_condominium: 0,
    val_iptu: 0,
    type_project: "ALUGUEL",
    st_disponibility: false,
    nm_project: "",
    ds_project: "",
    address_project: "",
    arr_photos: [],
    arr_drawings: [],
    arr_videos: [],
    val_area: 0,
    num_bedrooms: 0,
    num_bathrooms: 0,
    num_suits: 0,
    num_garage: 0,
    pet_friendly: false,
  };

  return (
    <main>
      <div className="py-10 container">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-theme-800">
              Listagem de projetos
            </h1>
            <p className="text-theme-600">
              Veja todos os projetos cadastrados no sistema
            </p>
          </div>
          <ModalNewProject
            project={projectBase}
            token={token?.value || ""}
            type="create"
          />
        </div>
        <DataTable columns={listProjectsColumns} data={projects.data || []} />
      </div>
    </main>
  );
}
