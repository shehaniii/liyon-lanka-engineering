import Image from "next/image";

const pillars = [
  {
    title: "Environmental Responsibility",
    description:
      "We minimize environmental impact by reducing waste, conserving resources, and following sustainable construction practices.",
  },
  {
    title: "Health & Safety",
    description:
      "Safety is our highest priority. Every project follows strict health and safety standards to protect employees and clients.",
  },
  {
    title: "Quality Assurance",
    description:
      "Our quality management processes ensure that every project meets international engineering standards.",
  },
  {
    title: "Innovation",
    description:
      "We continuously adopt modern technologies and engineering methods to improve efficiency and project performance.",
  },
];

export default function SustainabilityPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[350px]">
        <Image
          src="/images/sustainability.jpg"
          alt="Sustainability"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-green-900/70 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-5xl font-bold">
              Sustainability
            </h1>

            <p className="mt-5 text-xl">
              Building a Better Future Responsibly
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}

      <section className="max-w-7xl mx-auto py-20 px-6 text-center">

        <h2 className="text-4xl font-bold text-blue-900">
          Sustainable Engineering
        </h2>

        <p className="mt-8 text-gray-600 max-w-4xl mx-auto leading-8">
          At Liyon Lanka Engineering, sustainability is integrated into every
          stage of our projects. We strive to create long-lasting engineering
          solutions while protecting the environment, ensuring workplace safety,
          and supporting the communities we serve.
        </p>

      </section>

      {/* Four Pillars */}

      <section className="bg-gray-100 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-10">

            {pillars.map((pillar) => (

              <div
                key={pillar.title}
                className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition"
              >

                <h3 className="text-2xl font-bold text-green-700">
                  {pillar.title}
                </h3>

                <p className="mt-5 text-gray-600 leading-8">
                  {pillar.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-5xl font-bold text-green-700">
                100%
              </h2>

              <p className="mt-3 text-gray-600">
                Safety Commitment
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-5xl font-bold text-green-700">
                95%
              </h2>

              <p className="mt-3 text-gray-600">
                Waste Recycling
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-5xl font-bold text-green-700">
                150+
              </h2>

              <p className="mt-3 text-gray-600">
                Successful Projects
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-5xl font-bold text-green-700">
                20+
              </h2>

              <p className="mt-3 text-gray-600">
                Years of Experience
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="bg-blue-900 text-white py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold">
            Engineering for a Sustainable Tomorrow
          </h2>

          <p className="mt-6 text-lg">
            We are committed to delivering environmentally responsible,
            innovative, and high-quality engineering solutions.
          </p>

          <button className="mt-8 bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Learn More
          </button>

        </div>

      </section>

    </main>
  );
}