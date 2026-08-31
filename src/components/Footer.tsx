export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="text-xl font-bold tracking-wide">
            Liyon Lanka Engineering (PVT) LTD
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Professional Engineering & Heavy Machinery Solutions in Sri Lanka.
          </p>
        </div>

        <p className="text-xs text-slate-500">
          © 2026 Liyon Lanka Engineering. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}