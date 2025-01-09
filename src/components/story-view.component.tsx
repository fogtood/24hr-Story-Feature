import { useCallback, useEffect, useState } from "react";
import { useStoryContext } from "../context/stories.context";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import ProgressBar from "./progress-bar.component";

const StoryView = ({
  handleStoryViewClose,
  storyClicked,
}: {
  handleStoryViewClose: () => void;
  storyClicked: number | null;
}) => {
  const { stories } = useStoryContext();
  const [currentIndex, setCurrentIndex] = useState(storyClicked || 0);
  const [completedIndices, setCompletedIndices] = useState<number[]>(
    Array.from({ length: storyClicked || 0 }, (_, idx) => idx),
  );
  const duration = 3000; // 3 seconds per story
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    // Mark current story as completed
    setCompletedIndices((prev) => [...new Set([...prev, currentIndex])]);
    // Move to the next story
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, stories.length - 1));
  }, [currentIndex, stories.length]);

  const handlePrevious = useCallback(() => {
    // Revert completion of the previous story
    setCompletedIndices((prev) =>
      prev.filter((index) => index !== currentIndex - 1),
    );
    // Move to the previous story
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }, [currentIndex]);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutId) clearTimeout(timeoutId);

    // If all stories are completed, close the StoryView
    if (completedIndices.length === stories.length) {
      handleStoryViewClose();
      return;
    }

    // Set a new timeout to move to the next story
    const timer = setTimeout(() => {
      setCompletedIndices((prev) => [...new Set([...prev, currentIndex])]);
      if (currentIndex < stories.length - 1) {
        handleNext();
      } else {
        handleStoryViewClose();
      }
    }, duration);

    // Save the timeout ID for later clearing
    setTimeoutId(timer);

    return () => clearTimeout(timer);
  }, [
    currentIndex,
    completedIndices,
    stories.length,
    handleNext,
    handleStoryViewClose,
    duration,
  ]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentIndex < stories.length - 1) {
        handleNext();
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        handlePrevious();
      } else if (e.key === "Escape") {
        handleStoryViewClose();
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    handleNext,
    handlePrevious,
    handleStoryViewClose,
    currentIndex,
    stories.length,
  ]);

  return (
    <div className="fixed inset-0 z-50 touch-pan-y bg-black">
      {/* Progress Bars */}
      <div className="absolute left-0 right-0 top-0 z-10 flex space-x-2 p-2">
        {stories.map((_, idx) => (
          <ProgressBar
            key={idx}
            isActive={idx === currentIndex}
            duration={duration}
            isCompleted={completedIndices.includes(idx)}
          />
        ))}
      </div>

      {/* Top Controls */}
      <div className="absolute right-4 top-4 z-30 m-3 mr-0 flex items-center gap-2 text-white md:mr-3">
        <button className="hover:text-white">
          <Pause size={20} />
          <Play size={20} className="hidden" />
        </button>
        <button className="hover:text-white" onClick={handleStoryViewClose}>
          <X size={20} />
        </button>
      </div>

      {/* Left Chevron */}
      {currentIndex > 0 && (
        <div className="absolute inset-y-0 left-0 z-20 flex items-center text-white">
          <button onClick={handlePrevious}>
            <ChevronLeft size={30} />
          </button>
        </div>
      )}

      {/* Right Chevron */}
      {currentIndex + 1 !== stories.length && (
        <div className="absolute inset-y-0 right-0 z-20 flex items-center text-white">
          <button onClick={handleNext}>
            <ChevronRight size={30} />
          </button>
        </div>
      )}

      {/* Story Image */}
      <div className="absolute inset-0 flex items-center justify-center rounded-md">
        <img
          src={stories[currentIndex].imgURL}
          alt={`Story ${currentIndex + 1}`}
          className="max-h-[80vh] max-w-full object-contain"
        />
      </div>

      {/* Time Indicator */}
      <div className="absolute bottom-4 left-4 text-sm text-white/70">
        {new Date(stories[currentIndex].createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
};

export default StoryView;
