const features = [
  {
    title: "Experienced Engineers",
    description:
      "Highly qualified professionals delivering innovative engineering solutions.",
  },
  {
    title: "Quality Construction",
    description:
      "Committed to delivering projects that meet the highest quality standards.",
  },
  {
    title: "On-Time Delivery",
    description:
      "Efficient planning and execution ensure projects are completed on schedule.",
  },
  {
    title: "Safety First",
    description:
      "Strict adherence to occupational health and safety standards on every site.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-blue-900">
            Why Choose Liyon Lanka Engineering?
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto">
            We combine technical expertise, innovation, and commitment
            to deliver exceptional engineering solutions across Sri Lanka.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
            >
              <h3 className="text-xl font-bold text-blue-900">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}