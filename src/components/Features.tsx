import { Zap, Image, Download, Link2, FileDown, Layers, Smartphone, Cloud } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Lightning Fast",
      description: "Get results in seconds with our optimized AI processing",
    },
    {
      icon: <Image className="w-6 h-6 text-primary" />,
      title: "High Quality Results",
      description: "Precise edge detection for professional-looking images",
    },
    {
      icon: <FileDown className="w-6 h-6 text-primary" />,
      title: "Bulk Processing",
      description: "Process multiple images at once to save time",
    },
    {
      icon: <Link2 className="w-6 h-6 text-primary" />,
      title: "URL Support",
      description: "Remove backgrounds from online images directly",
    },
    {
      icon: <Download className="w-6 h-6 text-primary" />,
      title: "Free Downloads",
      description: "Download processed images in high quality PNG format",
    },
    {
      icon: <Layers className="w-6 h-6 text-primary" />,
      title: "Background Options",
      description: "Choose transparent, solid color, or custom backgrounds",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-primary" />,
      title: "Mobile Friendly",
      description: "Works perfectly on all devices and screen sizes",
    },
    {
      icon: <Cloud className="w-6 h-6 text-primary" />,
      title: "No Installation",
      description: "Use directly in your browser, no software needed",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Background Remover?
          </h2>
          <p className="text-xl text-gray-600">
            Professional-grade features, completely free to use
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};