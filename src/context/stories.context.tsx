import { createContext, ReactNode, useContext } from "react";
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
  const [stories, setStories] = useLocalStorage<StoryType[]>("stories", []);
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
