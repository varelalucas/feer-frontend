"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useCookies } from "next-client-cookies";
import moment from "moment";
import { TestimonialType } from "@/functions/testimonials";
import { ModalDeleteTestimonial } from "./ModalDeleteTestimonial";

export const listTestimonialsColumns: ColumnDef<TestimonialType>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return `# ${row.original.id}`;
    },
  },
  {
    accessorKey: "nm_person",
    header: "Nome do Cliente",
  },
  {
    accessorKey: "testimonial",
    header: "Avaliação",
    cell: ({ row }) => {
      return <p className="max-w-[450px]">{row.original.testimonial}</p>;
    },
  },
  {
    accessorKey: "dt_created_at",
    header: "Criado em",
    cell: ({ row }) => {
      return moment(row.original.dt_created_at).format("DD/MM/YYYY [às] HH:mm");
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const cookies = useCookies();

      const token = cookies.get("auth:token");

      return (
        <ModalDeleteTestimonial
          testimonial={row.original}
          token={token || ""}
        />
      );
    },
  },
];
