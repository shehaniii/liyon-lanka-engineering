import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen">

      <Image
        src="/images/hero.jpg"
        alt="Liyon Lanka Engineering"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 flex items-center">

        <div className="max-w-7xl mx-auto px-6 text-white">

          <p className="uppercase tracking-[6px] text-blue-300">
            Engineering • Construction • Innovation
          </p>

          <h1 className="mt-6 text-6xl lg:text-7xl font-bold leading-tight">
            Building Sri Lanka's
            <br />
            Future Together
          </h1>

          <p className="mt-8 text-xl max-w-2xl leading-8 text-gray-200">
            Liyon Lanka Engineering delivers reliable engineering,
            construction, project management, and infrastructure
            solutions with quality, safety, and innovation at every stage.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/projects"
              className="bg-blue-700 hover:bg-blue-800 px-8 py-4 rounded-lg font-semibold transition"
            >
              View Projects
            </Link>

            <Link
              href="/contact"
              className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-lg transition"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}