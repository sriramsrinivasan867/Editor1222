import { Upload, Wand2, Download } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-primary" />,
      title: "Upload Your Image",
      description:
        "Choose a single image, multiple images, or even an entire folder. Supports all major image formats.",
    },
    {
      icon: <Wand2 className="w-8 h-8 text-primary" />,
      title: "AI Processing",
      description:
        "Our advanced AI technology automatically detects and removes the background with high precision.",
    },
    {
      icon: <Download className="w-8 h-8 text-primary" />,
      title: "Download Result",
      description:
        "Get your processed image with transparent background in high-quality PNG format, ready to use.",
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Remove backgrounds in three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.title} className="feature-card">
              <div className="mb-6 inline-block bg-blue-50 p-3 rounded-lg">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};