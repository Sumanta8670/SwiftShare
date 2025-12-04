const CTASection = ({ openSignUp }) => {
  return (
    <div className="w-full overflow-hidden bg-linear-to-r from-slate-900 via-blue-900 to-slate-900 border-t border-slate-700 relative">
      <div className="max-w-7xl mx-auto py-16 md:py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              <span className="block mb-2">Ready to get started?</span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
                Create your account today
              </span>
            </h2>
          </div>
          <div className="shrink-0">
            <button
              onClick={() => openSignUp()}
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border border-transparent text-base md:text-lg font-semibold rounded-lg bg-linear-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
            >
              Sign Up for Free
            </button>
          </div>
        </div>
      </div>

      {/* Decorative linear blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </div>
  );
};

export default CTASection;
