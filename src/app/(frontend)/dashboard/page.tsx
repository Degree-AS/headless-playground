import OrdersChart from "./_components/orders-chart/orders-chart";
import TrafficChart from "./_components/traffic-chart/traffic-chart";

export default async function About() {
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
