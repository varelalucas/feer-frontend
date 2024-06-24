import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { PortfolioItem } from "@/components/portfolio/PortfolioItem";
import { getAllPortfolio } from "@/functions/portfolio";

export default async function PortfolioPage() {
  const portfolios = await getAllPortfolio({}, 0, 1000);

  return (
    <>
      <header className="py-10">
        <Navbar dark />
      </header>
      <main className="my-[107px] flex flex-col gap-[150px] max-lg:gap-10">
        {portfolios.data?.map((portfolio) => {
          return <PortfolioItem key={portfolio.id} portfolio={portfolio} />;
        })}
      </main>
      <Footer />
    </>
  );
}
