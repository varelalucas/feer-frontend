import { DataTable } from "@/components/panel/data-table";
import { ModalNewPortfolio } from "@/components/panel/portfolio/ModalNewPortfolio";
import { listPortfolioColumns } from "@/components/panel/portfolio/columns";
import { getAllPortfolio } from "@/functions/portfolio";
import { cookies } from "next/headers";

export default async function PortfolioPage() {
  const portfolios = await getAllPortfolio({}, 0, 1000);

  const cookieStore = cookies();
  const token = cookieStore.get("auth:token");

  const portfolioBase = {
    nm_portfolio: "",
    ds_portfolio: "",
    arr_photos: [],
    type_portfolio: "",
    val_duration: "",
    nm_client: "",
  };

  return (
    <div className="py-10 container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-theme-800">
            Listagem de portfólios
          </h1>
          <p className="text-theme-600">
            Veja todos os portfólios cadastrados no sistema
          </p>
        </div>
        <ModalNewPortfolio
          portfolio={portfolioBase}
          type="create"
          token={token?.value || ""}
        />
      </div>
      <DataTable data={portfolios.data || []} columns={listPortfolioColumns} />
    </div>
  );
}
