import { useState } from "react";
import { Plus } from "lucide-react";

const Container = () => {
  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-gray-50 p-5">
      <h1 className="text-2xl font-bold text-black">Stories</h1>
      <div className="mt-5">
        <Stories />
      </div>
    </div>
  );
};

export default Container;

const Stories = () => {
  const [image, setImage] = useState<File | null>(null);
  const imgURL = image ? URL.createObjectURL(image) : "";

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImage(file);
    }
  };

  return (
    <div className="scrollbar-hide flex gap-x-3 overflow-hidden overflow-x-auto p-2">
      <ImageUploader handleImageUpload={handleImageUpload} />
      {[...Array(2)].map((_, idx) => (
        <Story key={idx} imgURL={imgURL} />
      ))}
    </div>
  );
};

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
      <p className="p-1 text-center text-xs">Add Story</p>
    </div>
  );
};

const Story = ({ imgURL }: { imgURL: string }) => {
  return (
    <div className="inline-block">
      <button className="h-16 w-16 cursor-pointer overflow-hidden rounded-full border-2 border-gray-400 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
        <div className="h-full w-full">
          <img src={imgURL} className="h-full w-full object-cover" />
        </div>
      </button>
      <p className="truncate text-center text-[10px]">1 hour ago</p>
    </div>
  );
};
