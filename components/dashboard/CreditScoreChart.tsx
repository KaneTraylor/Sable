// components/dashboard/CreditScoreChart.tsx
import { Box, useColorModeValue } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { useMemo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  TimeScale
);

export type Period = "1M" | "3M" | "6M" | "1Y";

interface CreditScoreChartProps {
  period?: Period;
}

export default function CreditScoreChart({
  period = "1M",
}: CreditScoreChartProps) {
  // Mock data – you can filter by period if you want
  const rawData = useMemo(
    () => [
      { x: "2024-01-01", y: 500 },
      { x: "2024-02-01", y: 480 },
      { x: "2024-03-01", y: 520 },
      { x: "2024-04-01", y: 580 },
      { x: "2024-05-01", y: 560 },
      { x: "2024-06-01", y: 610 },
      { x: "2024-07-01", y: 640 },
      { x: "2024-08-01", y: 650 },
    ],
    [period]
  );

  // Chart colors
  const strokeColor = useColorModeValue("#37a169", "#48BB78");
  const gradientFill = (
    ctx: CanvasRenderingContext2D,
    chartArea: { top: number; bottom: number }
  ) => {
    const { top, bottom } = chartArea;
    const grad = ctx.createLinearGradient(0, top, 0, bottom);
    grad.addColorStop(0, `${strokeColor}33`);
    grad.addColorStop(1, `${strokeColor}00`);
    return grad;
  };

  const data = {
    datasets: [
      {
        label: "Score",
        data: rawData,
        fill: true,
        backgroundColor: (ctx: any) => {
          const chartArea = ctx.chart.chartArea;
          return chartArea
            ? gradientFill(ctx.chart.ctx, chartArea)
            : `${strokeColor}33`;
        },
        borderColor: strokeColor,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time" as const,
        time: { unit: "month" as const, tooltipFormat: "MMM yyyy" as const },
        grid: { display: false },
      },
      y: {
        min: 0,
        max: 850,
        ticks: { stepSize: 150 },
        grid: { color: useColorModeValue("#eee", "#555") },
      },
    },
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  return (
    <Box height={{ base: "200px", md: "300px" }}>
      <Line data={data} options={options} />
    </Box>
  );
}
