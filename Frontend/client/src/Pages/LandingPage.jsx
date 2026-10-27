import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";

const FEATURES = [
  ["fa-solid fa-car", "Inventory Management", "Add, edit, and delete every vehicle from one clean dashboard."],
  ["fa-solid fa-circle-check", "Sold / Available Tracking", "Track status, sale price, and buyer details for every car."],
  ["fa-solid fa-chart-line", "Live Dashboard Stats", "Total stock, sold units, remaining cars, and sales at a glance."],
  ["fa-solid fa-file-lines", "Document Upload", "Keep RC, Insurance, PUC and other papers linked to each car."],
  ["fa-solid fa-magnifying-glass", "Search & Filters", "Find cars instantly by brand, model, category, or status."],
  ["fa-solid fa-lock", "Secure & Private", "Each dealer only sees their own data — nothing is shared."],
];

const STEPS = [
  ["1", "Create your account", "Register free with your dealership name in under a minute."],
  ["2", "Add your cars", "Upload details, photos, and documents for every vehicle."],
  ["3", "Track every sale", "Mark cars sold and watch your dashboard update live."],
];

export default function Landing() {
  const { dealer } = useAuth();
  if (dealer) return <Navigate to="/dashboard" replace />;

  return (
    <div className="landing-animated min-h-screen bg-gradient-to-br from-white via-indigo-50/30 to-slate-100 text-slate-800">
      <style>{`
        @keyframes landingFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes landingFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .landing-animated .landing-nav { animation: landingFadeIn .55s ease-out both; }
        .landing-animated .landing-hero-content { animation: landingFadeUp .75s cubic-bezier(.2,.7,.2,1) both; }
        .landing-animated .landing-section { animation: landingFadeUp .7s ease-out both; }
        .landing-animated .feature-card {
          animation: landingFadeUp .65s ease-out both;
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .landing-animated .feature-card:nth-child(2) { animation-delay: .06s; }
        .landing-animated .feature-card:nth-child(3) { animation-delay: .12s; }
        .landing-animated .feature-card:nth-child(4) { animation-delay: .18s; }
        .landing-animated .feature-card:nth-child(5) { animation-delay: .24s; }
        .landing-animated .feature-card:nth-child(6) { animation-delay: .30s; }
        .landing-animated .feature-card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(15,23,42,.09); }
        .landing-animated .feature-icon { transition: transform .25s ease, background-color .25s ease; }
        .landing-animated .feature-card:hover .feature-icon { transform: scale(1.08) rotate(-4deg); background-color: #e0e7ff; }
        .landing-animated .step-number { transition: transform .25s ease, box-shadow .25s ease; }
        .landing-animated .step-item:hover .step-number { transform: translateY(-4px) scale(1.06); box-shadow: 0 10px 22px rgba(99,102,241,.28); }
        .landing-animated .landing-link { transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease, border-color .2s ease; }
        .landing-animated .landing-link:hover { transform: translateY(-2px); }
        .landing-animated .landing-link:active { transform: translateY(0) scale(.98); }
        .landing-animated .landing-footer { animation: landingFadeIn 1s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .landing-animated *, .landing-animated *::before, .landing-animated *::after {
            animation-duration: .01ms !important; animation-iteration-count: 1 !important;
            scroll-behavior: auto !important; transition-duration: .01ms !important;
          }
        }
      `}</style>

      <nav className="landing-nav max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-5">
        <span className="text-xl font-bold tracking-tight text-indigo-600"></span>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="landing-link px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-white/80">Login</Link>
          <Link to="/register" className="landing-link px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white shadow-md shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30">Register</Link>
        </div>
      </nav>

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-100/60 via-transparent to-transparent pointer-events-none" />
        <div className="landing-hero-content relative max-w-4xl mx-auto text-center px-4 sm:px-6 py-20 sm:py-28">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide mb-6">Built for car dealers</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900">
            Run your entire dealership{" "}<span className="text-indigo-600">from one place</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Manage inventory, track sales, store documents, and see live stats — all from a simple dashboard built for Indian car dealers.
          </p>
          <div className="mt-10 flex justify-center gap-3 sm:gap-4 flex-wrap">
            <Link to="/register" className="landing-link px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-medium shadow-md shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30">Start free</Link>
            <Link to="/login" className="landing-link px-7 py-3.5 rounded-xl bg-white border border-slate-200 font-medium text-slate-700 shadow-sm hover:bg-slate-50 hover:border-slate-300">Login</Link>
          </div>
        </div>
      </header>

      <section className="landing-section max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Everything you need</h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">Simple tools that replace notebooks, WhatsApp chats, and scattered Excel sheets.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(([logo, heading, bio]) => (
            <div key={heading} className="feature-card p-6 rounded-2xl bg-white/80 backdrop-blur border border-slate-200/80 shadow-sm hover:border-slate-300/80">
              <div className="feature-icon w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4"><i className={`${logo} text-lg`} /></div>
              <h3 className="font-semibold text-lg text-slate-900">{heading}</h3>
              <p className="text-slate-500 mt-1.5 text-sm leading-relaxed">{bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section bg-white/60 border-y border-slate-200/60 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">How it works</h2>
            <p className="mt-3 text-slate-500">Three simple steps to get started.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {STEPS.map(([number, heading, bio]) => (
              <div key={number} className="step-item text-center">
                <div className="step-number w-12 h-12 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-indigo-500/30">{number}</div>
                <h3 className="mt-5 font-semibold text-lg text-slate-900">{heading}</h3>
                <p className="text-slate-500 mt-1.5 text-sm leading-relaxed max-w-xs mx-auto">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Ready to organize your dealership?</h2>
        <p className="mt-3 text-slate-500 max-w-lg mx-auto">Join free today. No credit card required.</p>
        <Link to="/register" className="landing-link inline-flex mt-8 px-8 py-3.5 rounded-xl bg-indigo-600 text-white font-medium shadow-md shadow-indigo-500/25 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30">Create free account</Link>
      </section>

      <footer className="landing-footer border-t border-slate-200/60 py-8 text-center text-sm text-slate-400">
        <p>© {new Date().getFullYear()} <span className="font-medium text-slate-500">Shree Cars</span> · Built with MERN</p>
        <p className="mt-1">Developed by <span className="font-semibold text-slate-600">Arshad</span></p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="https://github.com/arshadshaikh868686-bit" target="_blank" rel="noreferrer" className="landing-link hover:text-blue-600 hover:underline">GitHub</a>
          <a href="https://www.linkedin.com/in/arshad1shaikh/" target="_blank" rel="noreferrer" className="landing-link hover:text-blue-600 hover:underline">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
