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
  const [isPaused, setIsPaused] = useState(false); // Pause/Play control
  const duration = 3000; // 3 seconds per story
  const [remainingTime, setRemainingTime] = useState(duration); // Track remaining time
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCompletedIndices((prev) => [...new Set([...prev, currentIndex])]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setRemainingTime(duration); // Reset the timer for the next story
    } else {
      handleStoryViewClose();
    }
  }, [currentIndex, stories.length, handleStoryViewClose, duration]);

  const handlePrevious = useCallback(() => {
    setCompletedIndices((prev) =>
      prev.filter((index) => index !== currentIndex - 1),
    );
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setRemainingTime(duration); // Reset the timer for the previous story
  }, [currentIndex, duration]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);

    if (!isPaused) {
      // Pausing: Clear timeout
      if (timeoutId) clearTimeout(timeoutId);
    } else {
      // Resuming: Restart timer
      setRemainingTime(duration); // Restart timer from the beginning
    }
  }, [timeoutId, isPaused]);

  // Effect to handle the timeout
  useEffect(() => {
    if (isPaused) {
      if (timeoutId) clearTimeout(timeoutId);
      return; // Stop the timer when paused
    }

    const timer = setTimeout(() => {
      handleNext();
    }, remainingTime);

    setTimeoutId(timer);

    return () => clearTimeout(timer);
  }, [isPaused, remainingTime, handleNext]);

  // Keyboard navigation and Spacebar for pause/play
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault(); // Prevent scrolling on Spacebar press
        togglePause();
      } else if (!isPaused) {
        if (e.key === "ArrowRight" && currentIndex < stories.length - 1) {
          handleNext();
        } else if (e.key === "ArrowLeft" && currentIndex > 0) {
          handlePrevious();
        } else if (e.key === "Escape") {
          handleStoryViewClose();
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    togglePause,
    handleNext,
    handlePrevious,
    handleStoryViewClose,
    currentIndex,
    stories.length,
    isPaused,
  ]);

  return (
    <div className="fixed inset-0 z-50 touch-pan-y bg-black">
      {/* Progress Bars */}
      <div className="absolute left-0 right-0 top-0 z-10 flex space-x-2 p-2">
        {stories.map((_, idx) => (
          <ProgressBar
            key={idx}
            isActive={idx === currentIndex && !isPaused}
            duration={remainingTime} // Pass remaining time to the active bar
            isCompleted={completedIndices.includes(idx)}
          />
        ))}
      </div>

      {/* Top Controls */}
      <div className="absolute right-4 top-4 z-30 m-3 mr-0 flex items-center gap-2 text-white md:mr-3">
        <button className="hover:text-white" onClick={togglePause}>
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
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
