import { useState } from "react";
import { useStoryContext } from "../context/stories.context";
import { convertImageToBase64 } from "../utils/imageToBase64";
import ImageUploader from "./image-uploader.component";
import Story from "./story.component";

const Stories = ({
  handleStoryViewOpen,
}: {
  handleStoryViewOpen: (idx: number) => void;
}) => {
  const { stories, setStories } = useStoryContext();
  const id = Math.floor(Math.random() * 1000000);

  const [image, setImage] = useState<File | null>(null);
  console.log(image);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);

      let imgURL = "";
      try {
        imgURL = await convertImageToBase64(file);
      } catch (error) {
        console.error(
          "An error occured while converting image to base64",
          error,
        );
        alert("Something went wrong😑");
        return;
      }

      setStories([{ id, imgURL, createdAt: Date.now() }, ...stories]);
    }
  };

  return (
    <div className="flex gap-x-3 overflow-hidden overflow-x-auto p-2 scrollbar-hide">
      <ImageUploader handleImageUpload={handleImageUpload} />
      {stories &&
        stories.map((story, idx) => (
          <Story
            key={story.id}
            imgURL={story.imgURL}
            createdAt={story.createdAt}
            onClick={() => handleStoryViewOpen(idx)}
          />
        ))}
    </div>
  );
};

export default Stories;
