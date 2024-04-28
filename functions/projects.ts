import { API, APIRequestGeneric } from "@/lib/API";
import { revalidatePath } from "@/lib/cookies";
import { cache } from "react";

export const revalidate = 1;

export type Project = {
  id: number;
  val_project: number;
  val_condominium: number;
  val_iptu: number;
  type_project: "ALUGUEL" | "COMPRA";
  st_disponibility: boolean;
  nm_project: string;
  ds_project: string;
  address_project: string;
  arr_photos: string[];
  arr_drawings: string[];
  arr_videos: string[];
  val_area: number;
  num_bedrooms: number;
  num_bathrooms: number;
  num_suits: number;
  num_garage: number;
  pet_friendly: boolean;
  dt_created_at: Date;
  dt_updated_at: Date;
};

export const getAllProjects = cache(
  async (
    filter = {},
    page = 0,
    pageSize = 10,
    token?: string
  ): Promise<APIRequestGeneric<Project[]>> => {
    return await API.request(
      `/projects/all?filter=${JSON.stringify(
        filter
      )}&page=${page}&pageSize=${pageSize}`,
      {},
      "GET",
      !!token ? token : false
    );
  }
);

export const deleteProject = async (
  id: number,
  token: string
): Promise<APIRequestGeneric<Project>> => {
  const request = await API.request(
    `/projects/delete/${id}`,
    {},
    "DELETE",
    token
  );

  revalidatePath("/panel/projects");
  revalidatePath("/projetos/disponiveis");
  revalidatePath("/projetos/futuros");
  revalidatePath("/");

  return request;
};

export const updateProject = async (id: number, data: any, token: string) => {
  const request = await API.request(
    `/projects/update/${id}`,
    { data },
    "PUT",
    token
  );

  revalidatePath("/panel/projects");
  revalidatePath("/projetos/disponiveis");
  revalidatePath("/projetos/futuros");
  revalidatePath("/");

  return request;
};

export const createProject = async (data: any, token: string) => {
  const request = await API.request(
    `/projects/create`,
    { data },
    "POST",
    token
  );

  revalidatePath("/panel/projects");
  revalidatePath("/projetos/disponiveis");
  revalidatePath("/projetos/futuros");
  revalidatePath("/");

  return request;
};
