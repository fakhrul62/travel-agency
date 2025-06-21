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
    return <p className="text-gray-500 text-xs md:text-base">No user growth data available.</p>;
  }

  return (
    <div className="w-full h-[200px] sm:h-[260px] md:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 16, left: 0, bottom: 8 }}
          barCategoryGap={20}
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
            tick={{ fontWeight: 600, fontSize: 12, fill: '#222' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#444' }} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#dbeafe", opacity: 0.3 }}
            wrapperStyle={{ fontSize: 12 }}
          />
          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            fill="url(#userBarGradient)"
            maxBarSize={32}
          >
            <LabelList
              dataKey="count"
              position="top"
              style={{
                fill: "#2563eb",
                fontWeight: 700,
                fontSize: 12,
              }}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4, fill: "#fff", stroke: "#2563eb", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;
