import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { name: "Jan", Employees: 20 },
  { name: "Feb", Employees: 35 },
  { name: "Mar", Employees: 50 },
  { name: "Apr", Employees: 40 },
  { name: "May", Employees: 60 },
  { name: "Jun", Employees: 45 },
  { name: "July", Employees: 45 },
  { name: "Aug", Employees: 5 },
  { name: "Sep", Employees: 0 },
];

export default function EmployeeGraph() {
  return (
    <div className="section w-full max-w-full h-[300px] sm:h-[400px] md:h-[400px] lg:h-[450px] rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
        Monthly Hiring Trend
      </h3>
      <div className="w-full h-full py-10 sm:py-14">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E9ADC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2E9ADC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} allowDecimals={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Employees"
              stroke="#2E9ADC"
              strokeWidth={2}
              fill="url(#colorEmployees)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
