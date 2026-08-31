import { getProjects, imageUrl, type Project } from "@/lib/api";

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try { projects = await getProjects(); } catch { /* Empty state shown below. */ }
  return <main>
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white py-24 px-6 text-center"><div className="max-w-7xl mx-auto px-6 text-center"><h1 className="text-5xl font-bold">Our Projects</h1><p className="mt-6 text-xl max-w-3xl mx-auto">Explore our engineering and construction work across Sri Lanka.</p></div></section>
    <section className="max-w-7xl mx-auto py-20 px-6"><div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">{projects.length ? projects.map((project) => <article key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden"><div className="h-56 bg-blue-50">{imageUrl(project.coverImageUrl) ? <img src={imageUrl(project.coverImageUrl)} alt={project.title} className="h-full w-full object-cover" /> : null}</div><div className="p-6"><span className="text-sm text-blue-700 font-semibold">{project.category}</span><h2 className="text-2xl font-bold mt-2">{project.title}</h2>{project.location ? <p className="text-gray-500 mt-2">{project.location}</p> : null}<p className="mt-4 text-gray-600 leading-7">{project.description}</p></div></article>) : <p className="text-gray-600">Projects will be available soon.</p>}</div></section>
  </main>;
}
