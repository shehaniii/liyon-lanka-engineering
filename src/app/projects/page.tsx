import Image from "next/image";

const projects = [
  {
    title: "Commercial Building Construction",
    location: "Colombo, Sri Lanka",
    image: "/images/project1.jpg",
    category: "Commercial",
    description:
      "Complete construction of a modern commercial building with high-quality finishing and engineering standards.",
  },
  {
    title: "Factory Development",
    location: "Gampaha, Sri Lanka",
    image: "/images/project2.jpg",
    category: "Industrial",
    description:
      "Design and construction of an industrial manufacturing facility including steel structures and utilities.",
  },
  {
    title: "Road Rehabilitation",
    location: "Kurunegala, Sri Lanka",
    image: "/images/project3.jpg",
    category: "Infrastructure",
    description:
      "Road improvement project including drainage systems and pavement construction.",
  },
  {
    title: "Residential Housing Project",
    location: "Kandy, Sri Lanka",
    image: "/images/project4.jpg",
    category: "Residential",
    description:
      "Luxury residential housing development completed with modern engineering practices.",
  },
  {
    title: "Warehouse Construction",
    location: "Hambantota, Sri Lanka",
    image: "/images/project5.jpg",
    category: "Industrial",
    description:
      "Construction of a large-scale warehouse with steel frame structures and loading facilities.",
  },
  {
    title: "Bridge Construction",
    location: "Matara, Sri Lanka",
    image: "/images/project6.jpg",
    category: "Infrastructure",
    description:
      "Construction of a reinforced concrete bridge to improve regional connectivity.",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Our Projects</h1>

          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Discover some of our successfully completed engineering and
            construction projects across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <div className="relative h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <span className="text-sm text-blue-700 font-semibold">
                  {project.category}
                </span>

                <h2 className="text-2xl font-bold mt-2">
                  {project.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  📍 {project.location}
                </p>

                <p className="mt-4 text-gray-600 leading-7">
                  {project.description}
                </p>

                <button className="mt-6 bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h2 className="text-5xl font-bold text-blue-900">150+</h2>
              <p className="mt-3 text-gray-600">Completed Projects</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-blue-900">20+</h2>
              <p className="mt-3 text-gray-600">Years Experience</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-blue-900">80+</h2>
              <p className="mt-3 text-gray-600">Professional Engineers</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-blue-900">100%</h2>
              <p className="mt-3 text-gray-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}