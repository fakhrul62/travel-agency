import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";

const TripsCreatedChart = ({ data }: { data: { day: string; count: number }[] }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p className="text-gray-500 text-xs md:text-base">No trip creation data available.</p>;
  }
  return (
    <div className="w-full h-[200px] sm:h-[260px] md:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 8 }} barCategoryGap={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tick={{ fontWeight: 600, fontSize: 12, fill: '#222' }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#444' }} />
          <Tooltip wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} maxBarSize={32}>
            <LabelList dataKey="count" position="top" style={{ fill: '#2563eb', fontWeight: 700, fontSize: 12 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TripsCreatedChart;
