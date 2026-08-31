import { getMachinery, imageUrl, type Machinery } from "@/lib/api";

export default async function MachineryPage() {
  let machinery: Machinery[] = [];
  try { machinery = await getMachinery(); } catch { /* Empty state shown below. */ }
  return <main>
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white py-24 px-6 text-center"><div className="max-w-7xl mx-auto px-6 text-center"><h1 className="text-5xl font-bold">Our Machinery</h1><p className="mt-6 text-xl max-w-3xl mx-auto">Modern equipment for safe, efficient, and reliable project delivery.</p></div></section>
    <section className="max-w-7xl mx-auto py-20 px-6"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">{machinery.length ? machinery.map((item) => <article key={item.id} className="rounded-xl overflow-hidden shadow-lg"><div className="h-56 bg-blue-50">{imageUrl(item.imageUrl) ? <img src={imageUrl(item.imageUrl)} alt={item.name} className="h-full w-full object-cover" /> : null}</div><div className="p-6 bg-white"><h2 className="text-2xl font-bold text-blue-900">{item.name}</h2>{item.brand || item.model ? <p className="mt-2 text-gray-500">{[item.brand, item.model].filter(Boolean).join(" · ")}</p> : null}<p className="mt-4 text-gray-600 leading-7">{item.description}</p></div></article>) : <p className="text-gray-600">Machinery information will be available soon.</p>}</div></section>
  </main>;
}
