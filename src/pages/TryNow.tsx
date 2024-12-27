import { ImageProcessor } from "@/components/ImageProcessor";
import { Footer } from "@/components/Footer";

export default function TryNow() {
  return (
    <div className="min-h-screen">
      <div className="py-20 px-4 hero-gradient">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-900 mb-6">
          Try It <span className="text-primary">Now</span>
        </h1>
      </div>
      <ImageProcessor />
      <Footer />
    </div>
  );
}