import { useClerk, useUser } from "@clerk/clerk-react";
import CTASection from "../components/landing/CTASection.jsx";
import FeaturesSection from "../components/landing/FeaturesSection.jsx";
import HeroSection from "../components/landing/HeroSection.jsx";
import PricingSection from "../components/landing/PricingSection.jsx";
import TestimonialsSection from "../components/landing/TestimonialsSection.jsx";
import { features, pricePlans, testimonials } from "../assets/data.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { openSignIn, openSignUp } = useClerk();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="landing-page w-full overflow-x-hidden bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <HeroSection openSignIn={openSignIn} openSignUp={openSignUp} />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Pricing Section */}
      <PricingSection pricePlans={pricePlans} openSignUp={openSignUp} />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* CTA Section */}
      <CTASection openSignUp={openSignUp} />
    </div>
  );
};

export default Landing;
