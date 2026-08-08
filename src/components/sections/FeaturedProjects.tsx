import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Commercial Complex",
    image: "/images/project1.jpg",
  },
  {
    title: "Factory Construction",
    image: "/images/project2.jpg",
  },
  {
    title: "Bridge Development",
    image: "/images/project3.jpg",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center mb-12">

          <h2 className="text-4xl font-bold">
            Featured Projects
          </h2>

          <Link
            href="/projects"
            className="text-blue-700"
          >
            View All →
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {projects.map((project) => (

            <div
              key={project.title}
              className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
            >

              <div className="relative h-64">

                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="p-6 bg-white">

                <h3 className="text-xl font-bold">
                  {project.title}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}