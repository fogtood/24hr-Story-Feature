import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";

const images = [
  "https://i.ibb.co/cvpntL1/hats.png",
  "https://via.placeholder.com/800x800",
  "https://via.placeholder.com/400x800",
];

const StoryView = ({
  handleStoryViewClose,
}: {
  handleStoryViewClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  }, []);

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
      <div className="absolute left-0 right-0 top-0 z-10 flex p-2">
        {/* {images.map((_, idx) => ( */}
        <ProgressBar
        // key={idx}
        // index={idx}
        // currentIndex={currentIndex}
        // isPlaying={isPlaying}
        />
        {/* ))} */}
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

      {/* RIght Chevron */}
      <div className="absolute inset-y-0 right-0 z-20 flex items-center">
        <button onClick={handleNext}>
          <ChevronRight />
        </button>
      </div>

      {/* Story image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={images[currentIndex]}
          alt={`Story ${currentIndex + 1}`}
          className="max-h-[80vh] max-w-full object-contain"
        />
      </div>

      {/* Time indicator */}
      <div className="absolute bottom-4 left-4 text-sm text-white/70">
        {/* {new Date(images[currentIndex].timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} */}
        24/11/24
      </div>
    </div>
  );
};

const ProgressBar = () => {
  return (
    <div className="hidden h-0.5 w-full items-center space-x-1 md:flex">
      <span className="h-full w-1/2 rounded bg-white" />
      <span className="h-full w-1/2 rounded bg-white" />
    </div>
  );
};

export default StoryView;
