import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  LabelList,
} from "recharts";

const BLUE_GRADIENT = {
  start: "#2563eb",
  end: "#60a5fa",
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { fullMonth, count } = payload[0].payload;
    return (
      <div className="bg-white p-2 border rounded shadow text-xs">
        <div>
          <b>{fullMonth}</b>
        </div>
        <div>Users: {count}</div>
      </div>
    );
  }
  return null;
};

const UserGrowthChart = ({
  data,
}: {
  data: { month: string; fullMonth: string; count: number }[];
}) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p className="text-gray-500">No user growth data available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        margin={{ top: 30, right: 40, left: 0, bottom: 10 }}
        barCategoryGap={30}
      >
        <defs>
          <linearGradient id="userBarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BLUE_GRADIENT.start} />
            <stop offset="100%" stopColor={BLUE_GRADIENT.end} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontWeight: 600, fontSize: 15 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "#dbeafe", opacity: 0.3 }}
        />
        <Bar
          dataKey="count"
          radius={[12, 12, 0, 0]}
          fill="url(#userBarGradient)"
          maxBarSize={40}
        >
          <LabelList
            dataKey="count"
            position="top"
            style={{
              fill: "#2563eb",
              fontWeight: 700,
              fontSize: 15,
            }}
          />
        </Bar>
        <Line
          type="monotone"
          dataKey="count"
          stroke="#2563eb"
          strokeWidth={2}
          dot={{ r: 5, fill: "#fff", stroke: "#2563eb", strokeWidth: 2 }}
          activeDot={{ r: 7 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserGrowthChart;
