import { useState } from "react";
import { useStoryContext } from "../context/stories.context";
import Stories from "./stories.component";
import StoryView from "./story-view.component";

const Container = () => {
  const [isStoryView, setIsStoryView] = useState(false);
  const { stories } = useStoryContext();

  const handleStoryViewOpen = () => setIsStoryView(true);
  const handleStoryViewClose = () => setIsStoryView(false);

  return (
    <>
      <div className="mx-auto min-h-screen max-w-3xl bg-gray-50 p-5">
        <h1 className="text-2xl font-bold text-black">Stories</h1>
        <div className="mt-5">
          <Stories handleStoryViewOpen={handleStoryViewOpen} />
        </div>
        {stories.length === 0 && (
          <p className="my-10 text-center">
            No stories yet. Click the + button to add your first story!
          </p>
        )}
      </div>
      {isStoryView ? (
        <StoryView handleStoryViewClose={handleStoryViewClose} />
      ) : null}
    </>
  );
};

export default Container;
