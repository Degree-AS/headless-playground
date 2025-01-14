import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { Suspense } from "react";

import LoadingIndicator from "@/components/loading-indicator/loading-indicator";
import OrdersChartServer from "./orders-chart.server";

const OrdersChart = async () => {
  return (
    <Card>
      <CardHeader>ORDERS BY DAY</CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIndicator />}>
          <OrdersChartServer />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default OrdersChart;
