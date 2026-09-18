const STATS = [
  { value: "150", label: "Samples" },
  { value: "4", label: "Features" },
  { value: "3", label: "Species" },
  { value: "ML", label: "Classification" },
];

export default function Statistics() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-4xl text-bloom-700">{stat.value}</p>
            <p className="mt-1 text-sm text-ink/50">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
