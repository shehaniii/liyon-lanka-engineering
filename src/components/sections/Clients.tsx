import Image from "next/image";

const clients = [
  "/images/clients/client1.png",
  "/images/clients/client2.png",
  "/images/clients/client3.png",
  "/images/clients/client4.png",
  "/images/clients/client5.png",
  "/images/clients/client6.png",
];

export default function Clients() {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-blue-900">
            Trusted By Our Clients
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">

          {clients.map((logo) => (

            <div
              key={logo}
              className="bg-white rounded-lg shadow p-6 flex justify-center"
            >

              <Image
                src={logo}
                alt="Client Logo"
                width={120}
                height={60}
                className="object-contain"
              />

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}