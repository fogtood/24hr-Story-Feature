import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type StoryType = {
  id: number;
  imgURL: string;
  createdAt: number;
};

export type StoriesContextType = {
  stories: StoryType[];
  setStories: (stories: StoryType[]) => void;
  loading: boolean;
};

const EXPIRY_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const defaultValue: StoriesContextType = {
  stories: [],
  setStories: () => {},
  loading: true, // Set default loading to true
};

const StoriesContext = createContext<StoriesContextType>(defaultValue);

export type StoriesProviderProps = {
  children: ReactNode;
};

export const StoriesProvider: React.FC<StoriesProviderProps> = ({
  children,
}) => {
  const [stories, setStoriesRaw] = useLocalStorage<StoryType[]>("stories", []);
  const [loading, setLoading] = useState(true); // Initialize as true

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

  // Initialize stories and handle loading state
  useEffect(() => {
    const initializeStories = async () => {
      // Simulate API call or heavy computation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setStories(filterExpiredStories(stories));
      setLoading(false);
    };

    initializeStories();
  }, []);

  // Periodically check for expired stories
  useEffect(() => {
    const interval = setInterval(() => {
      setStories(filterExpiredStories(stories));
    }, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, [stories]);

  const value: StoriesContextType = {
    stories,
    setStories,
    loading,
  };

  return (
    <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>
  );
};

export const useStoryContext = () => {
  return useContext(StoriesContext);
};
