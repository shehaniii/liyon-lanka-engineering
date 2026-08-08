const testimonials = [
  {
    name: "ABC Manufacturing (Pvt) Ltd",
    position: "Industrial Client",
    message:
      "Liyon Lanka Engineering delivered our factory project on schedule while maintaining exceptional quality and safety standards.",
  },
  {
    name: "XYZ Developers",
    position: "Commercial Client",
    message:
      "Their engineering expertise and project management made our commercial development a complete success.",
  },
  {
    name: "Local Authority",
    position: "Infrastructure Client",
    message:
      "Professional communication, timely delivery, and excellent workmanship throughout the project.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900">
            What Our Clients Say
          </h2>

          <p className="mt-4 text-gray-600">
            Trusted by organizations across Sri Lanka.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (

            <div
              key={item.name}
              className="bg-gray-50 rounded-xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
            >

              <div className="text-yellow-500 text-2xl mb-4">
                ★★★★★
              </div>

              <p className="text-gray-600 leading-7 italic">
                "{item.message}"
              </p>

              <div className="mt-8">

                <h3 className="font-bold text-blue-900">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item.position}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}