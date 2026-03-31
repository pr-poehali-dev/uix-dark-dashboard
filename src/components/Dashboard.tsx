import { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import KpiCards from "./dashboard/KpiCards";
import RevenueChart from "./dashboard/RevenueChart";
import CategoryStats from "./dashboard/CategoryStats";
import DonutChart from "./dashboard/DonutChart";
import TopTable from "./dashboard/TopTable";

export type Period = "7d" | "30d" | "90d";

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>("30d");
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeSection={activeSection} onSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header period={period} onPeriod={setPeriod} />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <KpiCards period={period} />
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-8">
              <RevenueChart period={period} />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <DonutChart />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-7">
              <CategoryStats />
            </div>
            <div className="col-span-12 lg:col-span-5">
              <TopTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
