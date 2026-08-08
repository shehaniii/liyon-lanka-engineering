const stats = [
  {
    value: "150+",
    label: "Projects",
  },
  {
    value: "20+",
    label: "Years Experience",
  },
  {
    value: "80+",
    label: "Engineers",
  },
  {
    value: "100%",
    label: "Client Satisfaction",
  },
];

export default function Stats() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="text-center bg-white p-8 rounded-xl shadow"
            >

              <h2 className="text-5xl font-bold text-blue-900">
                {stat.value}
              </h2>

              <p className="mt-3 text-gray-600">
                {stat.label}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}