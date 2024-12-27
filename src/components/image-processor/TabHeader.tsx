import { ImageIcon, Upload, FolderOpen, Link2 } from "lucide-react";
import { TabsTrigger } from "../ui/tabs";

export const TabHeader = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full p-2">
      <TabsTrigger 
        value="single" 
        className="flex items-center justify-center gap-1.5 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all hover:bg-gray-50 text-sm"
      >
        <ImageIcon className="w-4 h-4" />
        <span className="hidden sm:inline font-medium">Single</span>
      </TabsTrigger>
      <TabsTrigger 
        value="bulk" 
        className="flex items-center justify-center gap-1.5 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all hover:bg-gray-50 text-sm"
      >
        <Upload className="w-4 h-4" />
        <span className="hidden sm:inline font-medium">Bulk</span>
      </TabsTrigger>
      <TabsTrigger 
        value="folder" 
        className="flex items-center justify-center gap-1.5 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all hover:bg-gray-50 text-sm"
      >
        <FolderOpen className="w-4 h-4" />
        <span className="hidden sm:inline font-medium">Folder</span>
      </TabsTrigger>
      <TabsTrigger 
        value="url" 
        className="flex items-center justify-center gap-1.5 py-2 px-3 data-[state=active]:bg-primary data-[state=active]:text-white rounded-md transition-all hover:bg-gray-50 text-sm"
      >
        <Link2 className="w-4 h-4" />
        <span className="hidden sm:inline font-medium">URL</span>
      </TabsTrigger>
    </div>
  );
};