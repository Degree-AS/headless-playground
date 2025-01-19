import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Suspense } from "react";

import { LoadingIndicator } from "@/components/ui/loading-indicator";
import OrdersChartServer from "./orders-chart.server";

export const OrdersChart = async () => {
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
