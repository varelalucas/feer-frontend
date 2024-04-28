import { API, APIRequestGeneric } from "@/lib/API";
import { revalidatePath } from "@/lib/cookies";
import { cache } from "react";

export const revalidate = 1;

export type PortfolioType = {
  id: number;
  nm_portfolio: string;
  ds_portfolio: string;
  arr_photos: string[];
  type_portfolio: string;
  val_duration: string;
  nm_client: string;
  dt_created_at: Date;
  dt_updated_at: Date;
};

export const getAllPortfolio = cache(
  async (
    filter?: any,
    page?: number,
    pageSize?: number
  ): Promise<APIRequestGeneric<PortfolioType[]>> => {
    const request = await API.request(
      `/portfolio/all?filter=${JSON.stringify(
        filter
      )}&page=${page}&pageSize=${pageSize}`,
      {},
      "GET",
      false
    );

    return request;
  }
);

export const createPortfolio = async (data: any, token: string) => {
  const request = await API.request(
    `/portfolio/create`,
    { data },
    "POST",
    token
  );

  revalidatePath("/panel/portfolio");
  revalidatePath("/portfolio");

  return request;
};

export const deletePortfolio = async (
  id: number,
  token: string
): Promise<APIRequestGeneric<PortfolioType>> => {
  const request = await API.request(
    `/portfolio/delete/${id}`,
    {},
    "DELETE",
    token
  );

  revalidatePath("/panel/portfolio");
  revalidatePath("/portfolio");

  return request;
};

export const updatePortfolio = async (id: number, data: any, token: string) => {
  const request = await API.request(
    `/portfolio/update/${id}`,
    { data },
    "PUT",
    token
  );

  revalidatePath("/panel/portfolio");
  revalidatePath("/portfolio");

  return request;
};
