import Image from "next/image";

const benefits = [
  {
    title: "Career Growth",
    description:
      "Continuous learning opportunities and professional development programs.",
  },
  {
    title: "Competitive Salary",
    description:
      "Performance-based compensation and employee recognition.",
  },
  {
    title: "Safe Working Environment",
    description:
      "We maintain the highest standards of workplace safety and employee well-being.",
  },
  {
    title: "Training & Development",
    description:
      "Technical and leadership training to help you build your career.",
  },
];

const openings = [
  {
    title: "Civil Engineer",
    type: "Full Time",
    location: "Colombo",
  },
  {
    title: "Site Engineer",
    type: "Full Time",
    location: "Gampaha",
  },
  {
    title: "Quantity Surveyor",
    type: "Full Time",
    location: "Kandy",
  },
  {
    title: "Engineering Intern",
    type: "Internship",
    location: "Colombo",
  },
];

export default function CareersPage() {
  return (
    <main>

      {/* Hero */}

      <section className="relative h-[350px]">
        <Image
          src="/images/careers.jpg"
          alt="Careers"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-blue-900/70 flex items-center justify-center">

          <div className="text-center text-white px-6">

            <h1 className="text-5xl font-bold">
              Careers
            </h1>

            <p className="mt-5 text-xl">
              Build Your Future With Liyon Lanka Engineering
            </p>

          </div>

        </div>

      </section>

      {/* Why Join */}

      <section className="max-w-7xl mx-auto py-20 px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-blue-900">
            Why Join Our Team?
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">
            We believe our employees are our greatest asset.
            Join a team that values innovation, teamwork,
            integrity, and professional excellence.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-14">

          {benefits.map((benefit) => (

            <div
              key={benefit.title}
              className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl transition"
            >

              <h3 className="text-2xl font-bold text-blue-900">
                {benefit.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {benefit.description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Open Positions */}

      <section className="bg-gray-100 py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-blue-900">
            Current Opportunities
          </h2>

          <div className="mt-12 space-y-6">

            {openings.map((job) => (

              <div
                key={job.title}
                className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row justify-between items-start md:items-center"
              >

                <div>

                  <h3 className="text-2xl font-bold">
                    {job.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    {job.type} • {job.location}
                  </p>

                </div>

                <button className="mt-6 md:mt-0 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                  Apply Now
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Internship */}

      <section className="max-w-6xl mx-auto py-20 px-6 text-center">

        <h2 className="text-4xl font-bold text-blue-900">
          Internship Programme
        </h2>

        <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">
          We welcome undergraduate students in Civil Engineering,
          Mechanical Engineering, Electrical Engineering,
          Quantity Surveying, Management Information Systems,
          and related disciplines to gain valuable industry experience.
        </p>

        <button className="mt-10 bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition">
          Submit Your CV
        </button>

      </section>

      {/* CTA */}

      <section className="bg-blue-900 text-white py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold">
            Ready to Build Your Career?
          </h2>

          <p className="mt-6 text-lg">
            Join our growing team and become part of exciting engineering
            and infrastructure projects across Sri Lanka.
          </p>

          <button className="mt-8 bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Contact HR
          </button>

        </div>

      </section>

    </main>
  );
}