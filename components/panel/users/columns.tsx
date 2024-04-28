"use client";

import { type Project } from "@/functions/projects";
import { ColumnDef } from "@tanstack/react-table";
import { useCookies } from "next-client-cookies";
import moment from "moment";
import { ModalDeleteUser } from "./ModalDeleteUser";
import { User } from "@/functions/users";

export const listUsersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return `# ${row.original.id}`;
    },
  },
  {
    accessorKey: "full_name",
    header: "Nome Completo",
  },
  {
    accessorKey: "username",
    header: "Nome de usuário",
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
        <>
          <ModalDeleteUser user={row.original} token={token || ""} />
        </>
      );
    },
  },
];
