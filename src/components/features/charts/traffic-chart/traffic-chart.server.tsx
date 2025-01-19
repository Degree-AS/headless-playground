import TrafficChartClient from "./traffic-chart.client";

const getFakeServerData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
};

const TrafficChartServer = async () => {
  const chartData = await getFakeServerData();

  return <TrafficChartClient data={chartData} />;
};

export default TrafficChartServer;
