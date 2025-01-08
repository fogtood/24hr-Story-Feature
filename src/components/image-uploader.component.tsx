import { Plus } from "lucide-react";

const ImageUploader = ({
  handleImageUpload,
}: {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="inline-block">
      <label className="cursor-pointer">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-blue-400 transition-colors duration-300 hover:bg-blue-50">
          <Plus className="text-blue-400" size={18} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e)}
          />
        </div>
      </label>
      <p className="pt-1 text-center text-xs">Add Story</p>
    </div>
  );
};

export default ImageUploader;
