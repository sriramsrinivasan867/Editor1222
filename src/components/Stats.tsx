export const Stats = () => {
  const stats = [
    { value: "1M+", label: "Images Processed" },
    { value: "4.9/5", label: "User Rating" },
    { value: "100%", label: "Free to Try" },
    { value: "5s", label: "Average Process Time" },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};