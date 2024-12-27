import { Link2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ImageUrlTabProps {
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
  onUrlProcess: () => void;
}

export const ImageUrlTab = ({ imageUrl, onImageUrlChange, onUrlProcess }: ImageUrlTabProps) => {
  return (
    <div className="w-full">
      <div className="p-6 md:p-8 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-primary/20 transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4">Process Image from URL</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="url"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => onImageUrlChange(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={onUrlProcess} 
            className="whitespace-nowrap"
          >
            <Link2 className="w-4 h-4 mr-2" />
            Process URL
          </Button>
        </div>
      </div>
    </div>
  );
};