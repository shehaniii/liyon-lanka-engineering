export default function ContactPage() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-6 text-xl">
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}

      <section className="max-w-7xl mx-auto py-20 px-6">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left */}

          <div>

            <h2 className="text-4xl font-bold text-blue-900">
              Get In Touch
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Contact our engineering team for project inquiries,
              quotations, partnerships, or career opportunities.
            </p>

            <div className="mt-10 space-y-8">

              <div>
                <h3 className="font-bold text-xl">
                  📍 Address
                </h3>

                <p className="text-gray-600 mt-2">
                  No. 123, Main Road,<br />
                  Colombo,<br />
                  Sri Lanka.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl">
                  📞 Phone
                </h3>

                <p className="text-gray-600 mt-2">
                  +94 77 123 4567
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl">
                  📧 Email
                </h3>

                <p className="text-gray-600 mt-2">
                  info@liyonlankaengineering.com
                </p>
              </div>

              <div>
                <h3 className="font-bold text-xl">
                  🕒 Business Hours
                </h3>

                <p className="text-gray-600 mt-2">
                  Monday - Friday<br />
                  8.30 AM - 5.30 PM
                </p>
              </div>

            </div>

          </div>

          {/* Right */}

          <div className="bg-white rounded-xl shadow-xl p-8">

            <h2 className="text-3xl font-bold text-blue-900 mb-8">
              Send a Message
            </h2>

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg p-4"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-lg p-4"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-lg p-4"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-lg p-4"
              />

              <textarea
                rows={6}
                placeholder="Your Message"
                className="w-full border rounded-lg p-4"
              />

              <button
                className="bg-blue-900 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition w-full"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Google Map */}

      <section className="pb-20 px-6">

        <div className="max-w-7xl mx-auto">

          <iframe
            src="https://www.google.com/maps/embed?pb="
            className="w-full h-[450px] rounded-xl"
            loading="lazy"
          ></iframe>

        </div>

      </section>

    </main>
  );
}