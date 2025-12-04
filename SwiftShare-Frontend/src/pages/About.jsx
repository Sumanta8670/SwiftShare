import {
  Shield,
  Zap,
  Users,
  TrendingUp,
  Award,
  Globe,
  Heart,
  Lightbulb,
  Target,
  CheckCircle,
} from "lucide-react";

const About = () => {
  const stats = [
    {
      label: "Active Users",
      value: "500K+",
      icon: Users,
      desc: "Growing daily",
    },
    {
      label: "Files Shared",
      value: "10M+",
      icon: TrendingUp,
      desc: "Every month",
    },
    { label: "Uptime", value: "99.9%", icon: Globe, desc: "Guaranteed SLA" },
    {
      label: "Awards Won",
      value: "15+",
      icon: Award,
      desc: "Industry recognition",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      bio: "15+ years in cybersecurity",
      expertise: "Strategic Vision",
    },
    {
      name: "Marcus Johnson",
      role: "CTO",
      bio: "Former Google Cloud Engineer",
      expertise: "Infrastructure",
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Design",
      bio: "Award-winning UX Designer",
      expertise: "User Experience",
    },
    {
      name: "David Kim",
      role: "VP Operations",
      bio: "Scaled 3 SaaS companies",
      expertise: "Growth",
    },
  ];

  const milestones = [
    {
      year: "2020",
      event: "SwiftShare Founded",
      desc: "Started with a vision to revolutionize file sharing",
    },
    {
      year: "2021",
      event: "Series A Funding",
      desc: "$5M raised from top-tier VCs",
    },
    {
      year: "2022",
      event: "1M Users Milestone",
      desc: "Reached 1 million active users globally",
    },
    {
      year: "2023",
      event: "Enterprise Launch",
      desc: "Launched enterprise features & SSO",
    },
    {
      year: "2024",
      event: "Global Expansion",
      desc: "Expanded to 50+ countries",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      desc: "Every decision prioritizes data protection and user privacy",
      details: [
        "End-to-end encryption",
        "Regular security audits",
        "Compliance certifications",
      ],
    },
    {
      icon: Users,
      title: "User-Centric",
      desc: "We build for people with simplicity and accessibility",
      details: [
        "Intuitive interfaces",
        "Accessibility standards",
        "User feedback loops",
      ],
    },
    {
      icon: Zap,
      title: "Innovation",
      desc: "Relentlessly pushing boundaries for excellence",
      details: ["Continuous R&D", "Cutting-edge tech", "Future-focused"],
    },
    {
      icon: Heart,
      title: "Community",
      desc: "Fostering a supportive and inclusive ecosystem",
      details: ["Open feedback", "Community events", "User-led features"],
    },
  ];

  const features = [
    {
      icon: Lightbulb,
      title: "Innovative Technology",
      desc: "We leverage AI and machine learning to optimize file sharing",
    },
    {
      icon: Target,
      title: "Purpose-Driven",
      desc: "Committed to sustainability and social responsibility",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      desc: "Every feature undergoes rigorous testing and refinement",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-orange-400 font-medium text-sm">
              Our Story
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Redefining Secure{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">
              File Sharing
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            We believe that sharing files shouldn't be complicated or risky.
            SwiftShare was built on the conviction that enterprise-grade
            security and intuitive design can coexist perfectly. Founded by a
            team of security experts and designers, we're committed to making
            secure file sharing accessible to everyone.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10"
                >
                  <div className="flex justify-center mb-3">
                    <div className="bg-orange-500/20 p-3 rounded-lg">
                      <Icon className="text-orange-400" size={24} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
                  <p className="text-gray-500 text-xs mt-2">{stat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-slate-700">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-linear-to-br from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-2xl p-8 hover:border-orange-500/50 transition-all">
            <div className="bg-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Zap className="text-orange-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              To democratize enterprise-grade file sharing by making it
              accessible, affordable, and effortless for teams of all sizes.
              We're committed to protecting user privacy while enabling seamless
              collaboration across the globe.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={16} className="text-orange-400" />
                Empower teams globally
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={16} className="text-orange-400" />
                Protect data privacy
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={16} className="text-orange-400" />
                Enable collaboration
              </li>
            </ul>
          </div>

          <div className="bg-linear-to-br from-blue-500/10 to-orange-500/10 border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/50 transition-all">
            <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Globe className="text-blue-400" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              A world where secure file sharing is the default standard, not a
              luxury. We envision a future where organizations can collaborate
              fearlessly, knowing their data is protected by cutting-edge
              security and managed with intuitive interfaces.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={16} className="text-blue-400" />
                Universal security
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={16} className="text-blue-400" />
                Frictionless sharing
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <CheckCircle size={16} className="text-blue-400" />
                Global impact
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Why Choose SwiftShare?
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            We stand out in the market with our unique combination of security,
            usability, and innovation.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all group"
                >
                  <div className="bg-orange-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/30 transition-all">
                    <Icon className="text-orange-400" size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30 border-y border-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Core Values
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            These principles guide every decision we make and shape our company
            culture.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-orange-500/20 p-3 rounded-lg group-hover:bg-orange-500/30 transition-all">
                      <Icon className="text-orange-400" size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {value.title}
                      </h4>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{value.desc}</p>
                  <ul className="space-y-2">
                    {value.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-300 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Our Journey
          </h2>

          <div className="space-y-8">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30">
                    <span className="text-white font-bold">
                      {milestone.year.slice(-2)}
                    </span>
                  </div>
                </div>
                <div className="grow bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10">
                  <p className="text-orange-400 font-semibold text-sm">
                    {milestone.year}
                  </p>
                  <h4 className="text-xl font-bold text-white mt-2">
                    {milestone.event}
                  </h4>
                  <p className="text-gray-400 mt-2">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30 border-y border-slate-700">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Leadership Team
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Experienced visionaries building the future of file sharing
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center hover:border-orange-500/50 transition-all group"
              >
                <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-blue-500 rounded-full mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-orange-500/30 transition-all flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <p className="text-orange-400 font-medium text-sm mt-1">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm mt-3">{member.bio}</p>
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <p className="text-orange-400 text-xs font-semibold">
                    {member.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Our Impact
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-linear-to-br from-orange-500/10 to-transparent border border-orange-500/30 rounded-xl p-8">
              <h4 className="text-2xl font-bold text-white mb-4">
                100+ Companies
              </h4>
              <p className="text-gray-400">
                Trust us with their most sensitive data and critical file
                sharing needs
              </p>
            </div>
            <div className="bg-linear-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-8">
              <h4 className="text-2xl font-bold text-white mb-4">
                50+ Countries
              </h4>
              <p className="text-gray-400">
                Operating globally with local compliance and support in multiple
                languages
              </p>
            </div>
            <div className="bg-linear-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 rounded-xl p-8">
              <h4 className="text-2xl font-bold text-white mb-4">
                Zero Breaches
              </h4>
              <p className="text-gray-400">
                Maintaining perfect security record with continuous monitoring
                and updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center bg-linear-to-r from-orange-500/10 to-blue-500/10 border border-orange-500/30 rounded-2xl p-12 hover:border-orange-500/50 transition-all">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join the Revolution
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Experience the future of secure file sharing today
          </p>
          <button className="px-8 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
