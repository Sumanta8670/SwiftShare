import { useClerk, useUser } from "@clerk/clerk-react";
import Footer from "../components/Footer.jsx";
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
    <div className="landing-page bg-linear-to-b from-gray-50 to-gray-100">
      {/*Hero Section */}
      <HeroSection openSignIn={openSignIn} openSignUp={openSignUp} />

      {/*Features Section */}
      <FeaturesSection features={features} />

      {/*Pricing Section */}
      <PricingSection pricePlans={pricePlans} openSignUp={openSignUp} />

      {/*Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/*CTA Section */}
      <CTASection openSignUp={openSignUp} />

      {/*Footer Section */}
      <Footer />
    </div>
  );
};

export default Landing;
