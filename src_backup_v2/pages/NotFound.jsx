import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex-1 bg-slate-50 flex items-center justify-center">
      <div className="text-center px-4 py-20">
        <div className="w-20 h-20 bg-navy rounded-3xl flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl font-black text-brand">404</span>
        </div>
        <h1 className="text-3xl font-extrabold text-navy tracking-tight mb-3">Page not found</h1>
        <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
          This page doesn't exist — but your ROI calculator does.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
