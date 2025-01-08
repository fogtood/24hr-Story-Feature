import { useState } from "react";
import ImageUploader from "./image-uploader.component";
import Story from "./story.component";

const Stories = ({
  handleStoryViewOpen,
}: {
  handleStoryViewOpen: () => void;
}) => {
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
        <Story key={idx} imgURL={imgURL} onClick={handleStoryViewOpen} />
      ))}
    </div>
  );
};

export default Stories;
