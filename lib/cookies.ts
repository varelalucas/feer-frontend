"use server";

import { cookies } from "next/headers";
import { revalidatePath as revalida } from "next/cache";

export async function createCookie(name: string, data: string) {
  cookies().set(name, data, {
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
    priority: "high",
  });
}

export async function deleteCookie(name: string) {
  cookies().delete(name);
}

export const revalidatePath = async (path?: string) => {
  try {
    if (path) {
      revalida(path);
    } else {
      revalida("/");
    }
  } catch (error) {
    console.error("clearCachesByServerAction=> ", error);
  }
};
