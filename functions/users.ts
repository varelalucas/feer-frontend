import { API, APIRequestGeneric } from "@/lib/API";
import { createCookie, revalidatePath } from "@/lib/cookies";
import { redirect } from "next/navigation";

import { cache } from "react";

export const revalidate = 1;

export type User = {
  id: number;
  full_name: string;
  password: string;
  username: string;
  dt_created_at: Date;
  dt_updated_at: Date;
};

export const login = async (
  username: string,
  password: string
): Promise<APIRequestGeneric<{ token: string }>> => {
  const request = await API.request(
    "/users/login",
    {
      username,
      password,
    },
    "POST",
    false
  );

  console.log(request);

  if (request.status === 200) {
    await createCookie("auth:token", request.data.token).then();
  }

  return request;
};

export const getLocalUser = cache(async (): Promise<User> => {
  const { cookies } = await import("next/headers");

  const cookieStore = cookies();
  const token = cookieStore.get("auth:token");

  if (!token?.value) {
    return redirect("/auth/login");
  }

  const request = await API.request("/users/me", {}, "GET", true);

  return request.data;
});

export const getAllUsers = cache(
  async (filter: any): Promise<APIRequestGeneric<User[]>> => {
    return await API.request(
      `/users/all?filter=${JSON.stringify(filter)}&page=0&pageSize=1000`,
      {},
      "GET",
      true
    );
  }
);

export const createUser = async (
  username: string,
  password: string,
  fullname: string,
  token: string
): Promise<APIRequestGeneric<User>> => {
  const request = await API.request(
    "/users/create",
    { username, password, fullName: fullname },
    "POST",
    token
  );

  console.log(request);

  revalidatePath("/panel");

  return request;
};

export const deleteUser = async (
  id: number,
  token: string
): Promise<APIRequestGeneric<User>> => {
  const request = await API.request(`/users/delete/${id}`, {}, "DELETE", token);

  console.log(request);

  revalidatePath("/panel");

  return request;
};
