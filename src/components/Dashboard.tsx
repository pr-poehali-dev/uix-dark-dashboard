import { useState } from "react";
import Sidebar from "./dashboard/Sidebar";
import Header from "./dashboard/Header";
import KpiCards from "./dashboard/KpiCards";
import CityTable from "./dashboard/CityTable";
import ReasonsChart from "./dashboard/ReasonsChart";
import ConversionMap from "./dashboard/ConversionMap";
import MonthlyChart from "./dashboard/MonthlyChart";

export type ViewTab = "overview" | "table" | "reasons" | "cities";

export default function Dashboard() {
  const [tab, setTab] = useState<ViewTab>("overview");

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #080d1e 0%, #0b1135 50%, #060a1a 100%)" }}>
      <Sidebar activeTab={tab} onTab={setTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          <KpiCards />
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 xl:col-span-5">
              <ReasonsChart />
            </div>
            <div className="col-span-12 xl:col-span-7">
              <ConversionMap />
            </div>
          </div>
          <MonthlyChart />
          <CityTable />
        </main>
      </div>
    </div>
  );
}