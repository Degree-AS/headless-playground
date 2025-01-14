import OrdersChartClient from "./orders-chart.client";
import React from "react";

const getFakeServerData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
};

const OrdersChartServer = async () => {
  const chartData = await getFakeServerData();

  return <OrdersChartClient data={chartData} />;
};

export default OrdersChartServer;
