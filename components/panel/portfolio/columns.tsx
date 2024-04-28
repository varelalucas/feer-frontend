"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useCookies } from "next-client-cookies";
import moment from "moment";
import { PortfolioType } from "@/functions/portfolio";
import { ModalDeletePortfolio } from "./ModalDeletePortfolio";
import { ModalNewPortfolio } from "./ModalNewPortfolio";

export const listPortfolioColumns: ColumnDef<PortfolioType>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => {
      return `# ${row.original.id}`;
    },
  },
  {
    accessorKey: "nm_client",
    header: "Nome do Cliente",
  },
  {
    accessorKey: "nm_portfolio",
    header: "Nome do Projeto",
  },
  {
    accessorKey: "ds_portfolio",
    header: "Descrição",
    cell: ({ row }) => {
      return <p className="max-w-[450px]">{row.original.ds_portfolio}</p>;
    },
  },
  {
    accessorKey: "val_duration",
    header: "Duração",
  },
  {
    accessorKey: "type_portfolio",
    header: "Tipo do Projeto",
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
          <ModalNewPortfolio
            portfolio={row.original}
            token={token || ""}
            type="edit"
          />
          <ModalDeletePortfolio portfolio={row.original} token={token || ""} />
        </div>
      );
    },
  },
];
