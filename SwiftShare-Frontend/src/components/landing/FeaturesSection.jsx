import {
  ArrowUpCircle,
  Clock,
  CreditCard,
  FileText,
  Share2,
  Shield,
} from "lucide-react";

const FeaturesSection = ({ features }) => {
  const renderIcon = (iconName, iconColor) => {
    const iconProps = { size: 25, className: iconColor };
    switch (iconName) {
      case "ArrowUpCircle":
        return <ArrowUpCircle {...iconProps} />;
      case "Shield":
        return <Shield {...iconProps} />;
      case "Share2":
        return <Share2 {...iconProps} />;
      case "CreditCard":
        return <CreditCard {...iconProps} />;
      case "FileText":
        return <FileText {...iconProps} />;
      case "Clock":
        return <Clock {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  return (
    <div className="py-20 bg-white overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need for file sharing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            SwiftShare provides a range of features to meet your file sharing
            needs.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="pt-5 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
            >
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="mt-6">
                  <div className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
                    {renderIcon(feature.iconName, feature.iconColor)}
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-gray-900 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
