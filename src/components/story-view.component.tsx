import { useCallback, useEffect, useState } from "react";
import { useStoryContext } from "../context/stories.context";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";

const StoryView = ({
  handleStoryViewClose,
}: {
  handleStoryViewClose: () => void;
}) => {
  const { stories } = useStoryContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  }, [stories.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + stories.length) % stories.length,
    );
  }, [stories.length]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "Escape") {
        handleStoryViewClose();
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    // Cleanup function
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleNext, handlePrevious, handleStoryViewClose]);

  return (
    <div
      className="fixed inset-0 z-50 touch-pan-y bg-black"
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
    >
      {/* Progress bars */}
      <div className="absolute left-0 right-0 top-0 z-10 flex space-x-2 p-2">
        {stories.map((story) => {
          const widthPerStory = `${100 / stories.length}%`;
          return (
            <ProgressBar
              key={story.id}
              width={widthPerStory}
              // index={idx}
              // currentIndex={currentIndex}
              // isPlaying={isPlaying}
            />
          );
        })}
      </div>
      {/* Top Controls */}
      <div className="absolute right-4 top-4 z-30 m-3 flex items-center gap-2 text-white/80">
        <button className="hover:text-white">
          <Pause size={20} />
          <Play size={20} className="hidden" />
        </button>
        <button className="hover:text-white" onClick={handleStoryViewClose}>
          <X size={20} />
        </button>
      </div>
      {/* Left Checvron*/}
      <div className="absolute inset-y-0 left-0 z-20 flex items-center">
        <button onClick={handlePrevious}>
          <ChevronLeft />
        </button>
      </div>
      {/* Right Chevron */}
      <div className="absolute inset-y-0 right-0 z-20 flex items-center">
        <button onClick={handleNext}>
          <ChevronRight />
        </button>
      </div>
      {/* Story image */}
      <div className="absolute inset-0 flex items-center justify-center rounded-md">
        <img
          src={stories[currentIndex].imgURL}
          alt={`Story ${currentIndex + 1}`}
          className="max-h-[80vh] max-w-full object-contain"
        />
      </div>
      {/* Time indicator */}
      <div className="absolute bottom-4 left-4 text-sm text-white/70">
        {new Date(stories[currentIndex].createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

const ProgressBar = ({ width }: { width: string }) => {
  return (
    // <div className="hidden h-0.5 w-full items-center space-x-1 md:flex">
    <div className="h-0.5 w-1/2 rounded bg-white" style={{ width }} />
    // <span className="h-full w-1/2 rounded bg-white" />
    // </div>
  );
};

export default StoryView;
