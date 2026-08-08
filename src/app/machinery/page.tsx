import Image from "next/image";

const machinery = [
  {
    name: "Hydraulic Excavator",
    image: "/images/machinery/excavator.jpg",
    description:
      "Heavy-duty excavator suitable for earthwork, demolition, trenching, and large construction projects.",
  },
  {
    name: "Bulldozer",
    image: "/images/machinery/bulldozer.jpg",
    description:
      "Powerful bulldozer for land clearing, grading, and site preparation.",
  },
  {
    name: "Motor Grader",
    image: "/images/machinery/grader.jpg",
    description:
      "Precision grading equipment used for road construction and leveling surfaces.",
  },
  {
    name: "Wheel Loader",
    image: "/images/machinery/loader.jpg",
    description:
      "Efficient loader for moving aggregates, soil, and construction materials.",
  },
  {
    name: "Tower Crane",
    image: "/images/machinery/crane.jpg",
    description:
      "High-capacity crane designed for lifting heavy materials in high-rise construction.",
  },
  {
    name: "Concrete Mixer Truck",
    image: "/images/machinery/mixer.jpg",
    description:
      "Reliable concrete transportation ensuring consistent quality at construction sites.",
  },
];

export default function MachineryPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Our Machinery</h1>

          <p className="mt-6 text-xl max-w-3xl mx-auto">
            We utilize modern construction equipment and machinery to
            deliver projects safely, efficiently, and on schedule.
          </p>
        </div>
      </section>

      {/* Machinery Grid */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {machinery.map((item) => (
            <div
              key={item.name}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 bg-white">
                <h2 className="text-2xl font-bold text-blue-900">
                  {item.name}
                </h2>

                <p className="mt-4 text-gray-600 leading-7">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">
            Modern Equipment for Every Project
          </h2>

          <p className="mt-6 text-gray-600">
            Our fleet of machinery is maintained to the highest standards,
            ensuring safety, reliability, and exceptional performance on
            every project.
          </p>

          <button className="mt-8 bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
            Contact Us
          </button>
        </div>
      </section>
    </main>
  );
}