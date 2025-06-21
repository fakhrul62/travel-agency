import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

// Use a different shade of blue and a gradient fill for distinction
const BLUE_GRADIENT = {
  start: "#3b82f6", // lighter blue
  end: "#1e40af"   // darker blue
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { travelStyle, count } = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow text-xs">
        <div><b>{travelStyle}</b></div>
        <div>Trips: {count}</div>
      </div>
    );
  }
  return null;
};

const getFirstWord = (str: string) => str.split(" ")[0];

const TripsByStyleChart = ({ data }: { data: { travelStyle: string; count: number }[] }) => {
  // Map data to add a firstWord property for the X axis
  const chartData = data.map(item => ({ ...item, firstWord: getFirstWord(item.travelStyle) }));
  return (
    <div className="w-full h-[200px] sm:h-[260px] md:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 16, left: 0, bottom: 8 }}
          barCategoryGap={20}
        >
          <defs>
            <linearGradient id="blueBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BLUE_GRADIENT.start} />
              <stop offset="100%" stopColor={BLUE_GRADIENT.end} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="firstWord" tick={{ fontWeight: 600, fontSize: 12, fill: '#222' }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#444' }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#e0e7ff', opacity: 0.3 }} wrapperStyle={{ fontSize: 12 }} />
          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            fill="url(#blueBarGradient)"
            maxBarSize={32}
          >
            <LabelList dataKey="count" position="top" style={{ fill: '#1e40af', fontWeight: 700, fontSize: 12 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TripsByStyleChart;
