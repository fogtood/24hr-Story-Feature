import { createContext, ReactNode, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type StoryType = {
  id: number;
  imgURL: string;
  createdAt: number;
};

export type StoriesContextType = {
  stories: StoryType[];
  setStories: (stories: StoryType[]) => void;
};

const EXPIRY_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const defaultValue: StoriesContextType = {
  stories: [],
  setStories: () => {},
};

const StoriesContext = createContext<StoriesContextType>(defaultValue);

export type StoriesProviderProps = {
  children: ReactNode;
};

export const StoriesProvider: React.FC<StoriesProviderProps> = ({
  children,
}) => {
  const [stories, setStoriesRaw] = useLocalStorage<StoryType[]>("stories", []);

  // Filter out expired stories
  const filterExpiredStories = (stories: StoryType[]) => {
    return stories.filter(
      (story) => Date.now() - story.createdAt < EXPIRY_DURATION,
    );
  };

  // Wrapper for setStories to ensure expired stories are filtered out
  const setStories = (newStories: StoryType[]) => {
    setStoriesRaw(filterExpiredStories(newStories));
  };

  // On provider mount, filter out expired stories
  useEffect(() => {
    setStories(filterExpiredStories(stories));
  }, []);

  // Periodically check for expired stories
  useEffect(() => {
    const interval = setInterval(() => {
      setStories(filterExpiredStories(stories));
    }, 60 * 1000); // Check every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [stories]);

  const value: StoriesContextType = {
    stories,
    setStories,
  };

  return (
    <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>
  );
};

export const useStoryContext = () => {
  return useContext(StoriesContext);
};
