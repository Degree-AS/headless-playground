"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import React from "react";
import { Bar, BarChart } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export type OrdersChartClientProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

const OrdersChartClient: React.FC<OrdersChartClientProps> = (props) => {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={props.data}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default OrdersChartClient;
