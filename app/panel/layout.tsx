import { DashboardNavbar } from "@/components/panel/Navbar";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <DashboardNavbar />
      </header>
      <main>{children}</main>
    </>
  );
}
