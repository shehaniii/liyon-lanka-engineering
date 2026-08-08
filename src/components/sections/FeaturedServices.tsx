import Link from "next/link";

const services = [
  "Civil Engineering",
  "Building Construction",
  "Project Management",
  "Structural Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
];

export default function FeaturedServices() {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">

          <h2 className="text-4xl font-bold text-blue-900">
            Our Services
          </h2>

          <Link
            href="/services"
            className="text-blue-700 font-semibold hover:underline"
          >
            View All →
          </Link>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (
            <div
              key={service}
              className="border rounded-xl p-8 hover:bg-blue-900 hover:text-white transition"
            >
              <h3 className="text-xl font-bold">
                {service}
              </h3>

              <p className="mt-4 opacity-80">
                Professional engineering services tailored to your project requirements.
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}