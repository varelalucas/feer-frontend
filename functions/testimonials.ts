import { API, APIRequestGeneric } from "@/lib/API";
import { revalidatePath } from "@/lib/cookies";

export const revalidate = 1;

export type TestimonialType = {
  id: number;
  testimonial: string;
  nm_person: string;
  dt_created_at: string;
  dt_updated_at: string;
};

export const getAllTestimonials = async (): Promise<
  APIRequestGeneric<TestimonialType[]>
> => {
  return await API.request("/testimonials/all", {}, "GET", false);
};

export const deleteTestimonial = async (
  id: number,
  token: string
): Promise<APIRequestGeneric<TestimonialType>> => {
  const request = await API.request(
    `/testimonials/delete/${id}`,
    {},
    "DELETE",
    token
  );

  revalidatePath("/panel/testimonials");
  revalidatePath("/");

  return request;
};

export const createTestimonial = async (
  nmPerson: string,
  testimonial: string,
  token: string
): Promise<APIRequestGeneric<TestimonialType>> => {
  const request = await API.request(
    "/testimonials/create",
    { data: { testimonial, nm_person: nmPerson } },
    "POST",
    token
  );

  revalidatePath("/panel/testimonials");
  revalidatePath("/");

  return request;
};
