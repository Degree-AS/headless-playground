import { Card, CardContent, CardHeader } from "@/components/ui/card";

import LoadingIndicator from "@/components/loading-indicator/loading-indicator";
import { Suspense } from "react";
import TrafficChartServer from "./traffic-chart.server";

const TrafficChart = async () => {
  return (
    <Card>
      <CardHeader>TRAFFIC DATA</CardHeader>
      <CardContent>
        <Suspense fallback={<LoadingIndicator />}>
          <TrafficChartServer />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default TrafficChart;
