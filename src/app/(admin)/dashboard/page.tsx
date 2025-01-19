import { OrdersChart, TrafficChart } from "@/components/features";

export default function Dashboard() {
  return (
    <div className="flex flex-row">
      <main className="flex flex-col flex-[2] space-y-12">
        <TrafficChart />
        <OrdersChart />
      </main>
      <aside className="flex flex-1"></aside>
    </div>
  );
}
