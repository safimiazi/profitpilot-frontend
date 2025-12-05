export default function Page() {
  return (
    <div className="h-[3333px]">
      <h1 className="text-2xl font-semibold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card title="Total Messages" value="12,456" growth="+12%" />
        <Card title="Total Orders" value="821" growth="+5.2%" />
        <Card title="Total Revenue" value="$15,670" growth="+20%" />
        <Card title="Active Conversations" value="58" growth="-3%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <GraphCard title="Message Trends" value="4,120" growth="+12.5%" />
        <GraphCard title="Revenue Data" value="$5,890" growth="+8.2%" />
      </div>
    </div>
  );
}

const Card = ({ title, value, growth }: any) => (
  <div className="p-5 rounded-xl bg-[#1A0F27] border border-white/5">
    <p className="text-sm opacity-70">{title}</p>
    <h2 className="text-3xl font-bold mt-1">{value}</h2>
    <p className="text-green-400 text-sm">{growth}</p>
  </div>
);

const GraphCard = ({ title, value, growth }: any) => (
  <div className="p-5 rounded-xl bg-[#1A0F27] border border-white/5 h-64">
    <p className="text-sm opacity-70">{title}</p>
    <h2 className="text-2xl font-bold mt-1">{value}</h2>
    <p className="text-green-400 text-sm">{growth}</p>
  </div>
);
