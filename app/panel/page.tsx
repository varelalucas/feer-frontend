import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getAllUsers, getLocalUser } from "@/functions/users";
import { ModalNewUser } from "@/components/panel/users/ModalNewUser";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import moment from "moment";
import { ModalDeleteUser } from "@/components/panel/users/ModalDeleteUser";
import { DataTable } from "@/components/panel/data-table";
import { listUsersColumns } from "@/components/panel/users/columns";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth:token");

  const user = await getLocalUser();
  const users = await getAllUsers({ NOT: { id: user.id } });

  return (
    <main>
      <div className="py-10 container">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-theme-800">
              Listagem de usuários
            </h1>
            <p className="text-theme-600">
              Veja todos os usuários cadastrados no sistema
            </p>
          </div>
          <ModalNewUser token={token?.value || ""} />
        </div>
        <DataTable data={users.data || []} columns={listUsersColumns} />
      </div>
    </main>
  );
}
