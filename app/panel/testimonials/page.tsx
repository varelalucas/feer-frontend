import { DataTable } from "@/components/panel/data-table";
import { ModalNewTestimonial } from "@/components/panel/testimonials/ModalNewTestimonial";
import { listTestimonialsColumns } from "@/components/panel/testimonials/columns";
import { getAllTestimonials } from "@/functions/testimonials";
import { cookies } from "next/headers";

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials();

  const cookieStore = cookies();
  const token = cookieStore.get("auth:token");

  return (
    <div className="py-10 container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-theme-800">
            Listagem de avaliações
          </h1>
          <p className="text-theme-600">
            Veja todas as avaliações cadastradas no sistema
          </p>
        </div>
        <ModalNewTestimonial token={token?.value || ""} />
      </div>
      <DataTable
        data={testimonials.data || []}
        columns={listTestimonialsColumns}
      />
    </div>
  );
}
