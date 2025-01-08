import { useState } from "react";
import { useStoryContext } from "../context/stories.context";
import ImageUploader from "./image-uploader.component";
import Story from "./story.component";

const Stories = ({
  handleStoryViewOpen,
}: {
  handleStoryViewOpen: () => void;
}) => {
  const { stories, setStories } = useStoryContext();
  const id = Math.floor(Math.random() * 1000000);

  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setImage(file);
      const imgURL = URL.createObjectURL(file);
      setStories([{ id, imgURL, createdAt: Date.now() }, ...stories]);
    }
  };

  return (
    <div className="flex gap-x-3 overflow-hidden overflow-x-auto p-2 scrollbar-hide">
      <ImageUploader handleImageUpload={handleImageUpload} />
      {stories &&
        stories.map((story) => (
          <Story
            key={story.id}
            imgURL={story.imgURL}
            createdAt={story.createdAt}
            onClick={handleStoryViewOpen}
          />
        ))}
    </div>
  );
};

export default Stories;
