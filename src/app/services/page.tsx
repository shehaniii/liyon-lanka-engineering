import { getServices, type WebsiteService } from "@/lib/api";

export default async function ServicesPage() {
  let services: WebsiteService[] = [];
  try { services = await getServices(); } catch { /* Empty state shown below. */ }
  return <main>
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white py-24 px-6 text-center"><div className="max-w-7xl mx-auto px-6 text-center"><h1 className="text-5xl font-bold">Our Services</h1><p className="mt-6 text-xl max-w-3xl mx-auto">Comprehensive engineering and construction solutions tailored to every client&apos;s requirements.</p></div></section>
    <section className="max-w-7xl mx-auto py-20 px-6"><div className="grid md:grid-cols-3 gap-8">{services.length ? services.map((service) => <article key={service.id} className="border rounded-xl shadow-md hover:shadow-xl transition p-8"><h2 className="text-2xl font-bold text-blue-900">{service.title}</h2><p className="mt-4 text-gray-600 leading-7">{service.description}</p></article>) : <p className="text-gray-600">Services will be available soon.</p>}</div></section>
  </main>;
}
