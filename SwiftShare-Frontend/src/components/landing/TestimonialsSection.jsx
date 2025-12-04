import { Star, Quote, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";

const TestimonialsSection = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length]);

  const stats = [
    { label: "Customer Satisfaction", value: "98%", icon: Users },
    { label: "Average Time Saved", value: "12hrs/week", icon: TrendingUp },
  ];

  return (
    <div className="w-full overflow-hidden py-20 bg-slate-800/30 border-y border-slate-700 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <Quote size={16} className="text-orange-400" />
            <span className="text-orange-400 font-medium text-sm">
              Success Stories
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Loved by Teams{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
              Worldwide
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
            See what our customers have to say about SwiftShare and how it's
            transformed their workflows.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-linear-to-br from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-xl p-8 hover:border-orange-500/50 transition-all group cursor-pointer hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="text-orange-400" size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Testimonial Carousel */}
        <div className="mb-16">
          <div className="relative">
            {/* Active Testimonial - Large */}
            <div className="relative">
              <div className="bg-linear-to-br from-orange-500/20 to-blue-500/20 border-2 border-orange-500 rounded-2xl p-12 shadow-2xl shadow-orange-500/20 transition-all duration-500 transform hover:scale-105">
                {/* Quote Icon */}
                <div className="absolute top-6 right-8 opacity-20">
                  <Quote size={60} className="text-orange-400" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[activeIndex].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-orange-400 font-medium">
                        {testimonials[activeIndex].role}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {testimonials[activeIndex].company}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${
                          i < testimonials[activeIndex].rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="text-gray-400 text-sm ml-2">
                      ({testimonials[activeIndex].rating}/5)
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-xl text-gray-200 italic leading-relaxed mb-8">
                    "{testimonials[activeIndex].quote}"
                  </p>

                  {/* Metrics if available */}
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-gray-400 text-sm">
                      ✓ Result: Saved 15+ hours per week
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => {
                    setAutoPlay(false);
                    setActiveIndex(
                      (prev) =>
                        (prev - 1 + testimonials.length) % testimonials.length
                    );
                  }}
                  className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-orange-500/50 hover:bg-slate-800 transition-all transform hover:scale-110 active:scale-95"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setAutoPlay(false);
                        setActiveIndex(idx);
                      }}
                      className={`h-3 rounded-full transition-all ${
                        idx === activeIndex
                          ? "bg-orange-500 w-8"
                          : "bg-slate-700 w-3 hover:bg-slate-600"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    setAutoPlay(false);
                    setActiveIndex((prev) => (prev + 1) % testimonials.length);
                  }}
                  className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-orange-500/50 hover:bg-slate-800 transition-all transform hover:scale-110 active:scale-95"
                >
                  Next →
                </button>
              </div>

              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="mt-4 w-full py-2 text-gray-400 hover:text-gray-300 transition-colors text-sm font-medium"
              >
                {autoPlay ? "⏸ Pause" : "▶ Resume"} Auto-play
              </button>
            </div>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            More Success Stories
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setAutoPlay(false);
                  setActiveIndex(idx);
                }}
                className={`rounded-xl p-6 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  idx === activeIndex
                    ? "bg-linear-to-br from-orange-500/20 to-blue-500/20 border-2 border-orange-500 shadow-lg shadow-orange-500/20"
                    : "bg-slate-800/50 border border-slate-700 hover:border-orange-500/50"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-400">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-300 text-sm italic line-clamp-3">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-linear-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-2xl p-8">
          <h3 className="text-center text-white font-semibold mb-8">
            Trusted by Industry Leaders
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { badge: "ISO 27001", desc: "Certified" },
              { badge: "SOC 2", desc: "Compliant" },
              { badge: "GDPR", desc: "Ready" },
              { badge: "99.9%", desc: "Uptime SLA" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-orange-500/50 transition-all hover:scale-105"
              >
                <p className="text-orange-400 font-bold">{item.badge}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 -right-32 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </div>
  );
};

export default TestimonialsSection;
