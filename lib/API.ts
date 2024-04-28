import axios from "axios";
export const API = {
  request: async (
    route: string,
    data: any,
    method: "GET" | "POST" | "PUT" | "DELETE",
    auth: boolean | string
  ): Promise<APIRequestGeneric<any>> => {
    let cookieStore;
    let token;

    if (typeof auth === "boolean" && auth) {
      const { cookies } = await import("next/headers");

      cookieStore = cookies();
      token = cookieStore.get("auth:token");
    }

    if (typeof auth === "string" && auth.length > 0) {
      token = {
        value: auth,
      };
    }

    let config: any = {
      method,
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      url: route,
    };

    if (!!data) {
      if (method === "GET") {
        config.params = data;
      } else {
        config.data = data;
      }
    }

    if (!!token) {
      config.headers = {
        Authorization: `Bearer ${token.value}`,
      };
    }

    return await axios
      .request(config)
      .then((response) => {
        if (!!response.data?.data?.content) {
          return {
            status: response.status,
            message: response.data.message,
            data: response.data.data.content,
            total: response.data.data.total,
          };
        }

        if (!!response.data) {
          return {
            status: response.status,
            message: response.data.message,
            data: response.data.data,
          };
        }

        return { status: response.status, data: response.data };
      })
      .catch((error) => {
        if (error?.response) {
          return {
            status: error.response.status,
            message: error.response.data.message,
            data: error.response.data,
          };
        }

        return {
          status: 500,
          message:
            "Ocorreu um erro de comunicação com o servidor. Favor tente mais tarde!",
        };
      });
  },
};

export type APIRequestGeneric<T> =
  | { status: number; message: any; data: T; total?: number }
  | { status: number; data: T; message?: undefined; total?: number }
  | { status: any; message: any; data: T; total?: number }
  | { status: number; message: string; data?: T; total?: number };
