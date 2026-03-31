import { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import WelcomeBanner from "./dashboard/WelcomeBanner";
import KpiCards from "./dashboard/KpiCards";
import CityTable from "./dashboard/CityTable";
import ReasonsChart from "./dashboard/ReasonsChart";
import ConversionMap from "./dashboard/ConversionMap";
import MonthlyChart from "./dashboard/MonthlyChart";

export type ViewTab = "overview" | "table" | "reasons" | "cities";

export default function Dashboard() {
  const [tab, setTab] = useState<ViewTab>("overview");

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--slate-50)]">
      <Sidebar activeTab={tab} onTab={setTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1360px] mx-auto px-8 py-6 space-y-6">
            <WelcomeBanner />
            <KpiCards />
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 xl:col-span-5">
                <ReasonsChart />
              </div>
              <div className="col-span-12 xl:col-span-7">
                <ConversionMap />
              </div>
            </div>
            <MonthlyChart />
            <CityTable />
          </div>
        </main>
      </div>
    </div>
  );
}
