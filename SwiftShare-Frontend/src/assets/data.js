import {
  CreditCard,
  Files,
  LayoutDashboard,
  Receipt,
  Upload,
} from "lucide-react";

export const features = [
  {
    iconName: "ArrowUpCircle",
    iconColor: "text-cyan-400",
    title: "Lightning-Fast Uploads",
    description:
      "Experience blazing-fast file transfers with our next-gen upload engine. Drag, drop, and deploy in seconds.",
  },
  {
    iconName: "Shield",
    iconColor: "text-emerald-400",
    title: "Military-Grade Security",
    description:
      "End-to-end AES-256 encryption ensures your data remains impenetrable. Your files, your fortress.",
  },
  {
    iconName: "Share2",
    iconColor: "text-blue-400",
    title: "Smart Sharing",
    description:
      "Generate secure, time-limited links with granular access controls. Share smarter, not harder.",
  },
  {
    iconName: "CreditCard",
    iconColor: "text-orange-400",
    title: "Dynamic Credits",
    description:
      "Scale seamlessly with our intelligent credit system. Pay precisely for your storage footprint.",
  },
  {
    iconName: "FileText",
    iconColor: "text-rose-400",
    title: "Unified Dashboard",
    description:
      "Command your entire file ecosystem from one powerful interface. Organize, preview, and distribute effortlessly.",
  },
  {
    iconName: "Clock",
    iconColor: "text-violet-400",
    title: "Real-Time Analytics",
    description:
      "Track every transaction, monitor usage patterns, and optimize your workflow with live insights.",
  },
];

export const pricePlans = [
  {
    name: "Starter",
    price: 0,
    description: "Perfect for individuals exploring possibilities",
    features: [
      "100 file uploads per month",
      "Secure link sharing",
      "14-day file retention",
      "Standard encryption",
      "Community support",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Plus",
    price: 999,
    description: "Ideal for growing freelancers and creators",
    features: [
      "500 file uploads per month",
      "Password-protected links",
      "30-day file retention",
      "Priority encryption",
      "Email support (48hr response)",
      "Basic analytics",
    ],
    cta: "Upgrade to Plus",
    highlighted: false,
  },
  {
    name: "Pro",
    price: 2499,
    description: "Built for ambitious teams and creators",
    features: [
      "2,000 file uploads per month",
      "Advanced sharing controls",
      "90-day file retention",
      "Priority support (24hr response)",
      "Advanced analytics dashboard",
      "Custom branding",
      "Collaboration tools",
      "Team workspaces (up to 10 members)",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
  {
    name: "Business",
    price: 4999,
    description: "Designed for established businesses and agencies",
    features: [
      "5,000 file uploads per month",
      "Enterprise-grade sharing",
      "180-day file retention",
      "Premium support (12hr response)",
      "Custom analytics & reports",
      "White-label branding",
      "Advanced team management",
      "API access (10K calls/month)",
      "Dedicated storage pools",
    ],
    cta: "Scale with Business",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 9999,
    description: "Engineered for scale and performance",
    features: [
      "Unlimited file uploads",
      "Enterprise SSO & permissions",
      "Lifetime file retention",
      "Dedicated account manager",
      "Real-time analytics & BI tools",
      "Full API access (unlimited)",
      "Complete white-label solutions",
      "Custom integrations & workflows",
      "SLA guarantees (99.9% uptime)",
      "On-premise deployment options",
    ],
    cta: "Go Enterprise",
    highlighted: false,
  },
];

export const testimonials = [
  {
    name: "Alex Rivera",
    role: "Lead Product Designer",
    company: "Quantum Studios",
    image: "src/assets/Alex.png",
    quote:
      "SwiftShare eliminated our file-sharing bottlenecks. We ship designs 3x faster now. Absolute game-changer.",
    rating: 4,
  },
  {
    name: "Maya Thompson",
    role: "VP of Operations",
    company: "NexGen Media",
    image: "src/assets/Maya.png",
    quote:
      "The security features give us complete peace of mind. Our clients trust us with sensitive assets, and SwiftShare never disappoints.",
    rating: 5,
  },
  {
    name: "Jordan Park",
    role: "Creative Director",
    company: "Indie Creator",
    image: "src/assets/Jordan.png",
    quote:
      "Finally, a platform that understands creative workflows. The interface is intuitive, powerful, and just works.",
    rating: 5,
  },
  {
    name: "Samira Patel",
    role: "Engineering Lead",
    company: "CloudForce Technologies",
    image: "src/assets/Samira.png",
    quote:
      "SwiftShare's API integration was seamless. We automated our entire asset pipeline in under a week. Phenomenal developer experience.",
    rating: 4,
  },
];
export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    id: "03",
    label: "My Files",
    icon: Files,
    path: "/my-files",
  },
  {
    id: "04",
    label: "Subscription",
    icon: CreditCard,
    path: "/subscription",
  },
  {
    id: "05",
    label: "Transactions",
    icon: Receipt,
    path: "/transactions",
  },
];
