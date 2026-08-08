export default function ServicesPage() {

  const services = [
    {
      title: "Civil Engineering",
      description:
        "Planning, designing, and executing civil engineering projects with precision and quality."
    },
    {
      title: "Building Construction",
      description:
        "Residential, commercial, and industrial construction services from concept to completion."
    },
    {
      title: "Project Management",
      description:
        "Comprehensive project planning, scheduling, cost control, and execution management."
    },
    {
      title: "Structural Engineering",
      description:
        "Safe and efficient structural design for modern buildings and infrastructure."
    },
    {
      title: "Mechanical Engineering",
      description:
        "Installation and maintenance of mechanical systems and industrial equipment."
    },
    {
      title: "Electrical Engineering",
      description:
        "Electrical installations, power distribution, and industrial electrical solutions."
    },
    {
      title: "Road & Infrastructure",
      description:
        "Construction of roads, drainage systems, bridges, and public infrastructure."
    },
    {
      title: "Maintenance Services",
      description:
        "Preventive and corrective maintenance to ensure long-term operational efficiency."
    },
    {
      title: "Engineering Consultancy",
      description:
        "Professional technical consultation, feasibility studies, and engineering advice."
    }
  ];

  return (
    <main>

      {/* Hero */}

      <section className="bg-blue-900 text-white py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            Our Services
          </h1>

          <p className="mt-6 text-xl max-w-3xl mx-auto">
            We deliver comprehensive engineering and construction
            solutions tailored to every client's requirements.
          </p>

        </div>

      </section>

      {/* Services */}

      <section className="max-w-7xl mx-auto py-20 px-6">

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service) => (

            <div
              key={service.title}
              className="border rounded-xl shadow-md hover:shadow-xl transition duration-300 p-8"
            >

              <h2 className="text-2xl font-bold text-blue-900">
                {service.title}
              </h2>

              <p className="mt-4 text-gray-600 leading-7">
                {service.description}
              </p>

              <button className="mt-6 bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Learn More
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="bg-gray-100 py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold">
            Let's Build Your Next Project Together
          </h2>

          <p className="mt-6 text-gray-600">
            Our experienced engineering professionals are ready to
            deliver safe, efficient, and innovative solutions.
          </p>

          <button className="mt-8 bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition">
            Contact Us
          </button>

        </div>

      </section>

    </main>
  );
}