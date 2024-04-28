"use client";

import { type Project } from "@/functions/projects";
import { ColumnDef } from "@tanstack/react-table";
import { useCookies } from "next-client-cookies";
import moment from "moment";
import { ModalDeleteProject } from "./ModalDeleteProject";
import { ModalNewProject } from "./ModalNewProject";

export const listProjectsColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return <p className="text-nowrap"># {row.original.id}</p>;
    },
  },
  {
    accessorKey: "nm_project",
    header: "Nome",
  },
  {
    accessorKey: "val_project",
    header: "Valor",
    cell: ({ row }) => {
      return `${row.original.val_project.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })}`;
    },
  },
  {
    accessorKey: "val_condominium",
    header: "Condomínio",
    cell: ({ row }) => {
      return `${row.original.val_condominium.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })}`;
    },
  },
  {
    accessorKey: "val_iptu",
    header: "IPTU",
    cell: ({ row }) => {
      return `${row.original.val_iptu.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })}`;
    },
  },
  {
    accessorKey: "type_project",
    header: "Tipo",
  },
  {
    accessorKey: "st_disponibility",
    header: "Disponível",
    cell: ({ row }) => {
      return `${row.original.st_disponibility ? "Sim" : "Não"}`;
    },
  },
  {
    accessorKey: "address_project",
    header: "Endereço",
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
        <div className="flex gap-2 items-center">
          <ModalNewProject
            project={row.original}
            token={token || ""}
            type="edit"
          />
          <ModalDeleteProject project={row.original} token={token || ""} />
        </div>
      );
    },
  },
];
