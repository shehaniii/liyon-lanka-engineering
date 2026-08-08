import Image from "next/image";

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[350px]">
        <Image
          src="/images/about.jpg"
          alt="About Liyon Lanka Engineering"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-5xl font-bold">About Us</h1>
            <p className="mt-4 text-lg">
              Delivering Engineering Excellence Across Sri Lanka
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="/images/about.jpg"
            alt="Company"
            width={600}
            height={450}
            className="rounded-xl shadow-lg"
          />

          <div>
            <h2 className="text-4xl font-bold text-blue-900">
              Who We Are
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Liyon Lanka Engineering is a trusted engineering and
              construction company committed to delivering high-quality,
              innovative, and sustainable solutions for industrial,
              commercial, and infrastructure projects.
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              Our experienced engineers, technical specialists, and
              project managers work together to provide safe,
              cost-effective, and reliable engineering services while
              maintaining the highest professional standards.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div className="bg-white p-10 rounded-xl shadow-lg">
            <h3 className="text-3xl font-bold text-blue-900">
              Our Mission
            </h3>

            <p className="mt-6 text-gray-600 leading-8">
              To provide innovative engineering and construction
              solutions while maintaining excellence in quality,
              safety, sustainability, and customer satisfaction.
            </p>
          </div>

          <div className="bg-white p-10 rounded-xl shadow-lg">
            <h3 className="text-3xl font-bold text-blue-900">
              Our Vision
            </h3>

            <p className="mt-6 text-gray-600 leading-8">
              To become one of Sri Lanka's leading engineering
              companies recognized for excellence, innovation,
              integrity, and sustainable development.
            </p>
          </div>

        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto py-20 px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900">
          Our Core Values
        </h2>

        <div className="grid md:grid-cols-4 gap-8 mt-12">

          {[
            {
              title: "Quality",
              text: "Delivering exceptional workmanship and reliable engineering solutions."
            },
            {
              title: "Safety",
              text: "Maintaining the highest workplace health and safety standards."
            },
            {
              title: "Innovation",
              text: "Applying modern technology and engineering best practices."
            },
            {
              title: "Integrity",
              text: "Building long-term relationships through honesty and professionalism."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white shadow-lg rounded-xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-blue-800">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {item.text}
              </p>
            </div>
          ))}

        </div>

      </section>
    </main>
  );
}