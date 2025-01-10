import { useStoryContext } from "../context/stories.context";
import StoryContent from "./stories-content.component";
import Skeleton from "./skeleton.component";

const Container = () => {
  const { loading } = useStoryContext();

  if (loading) {
    return <Skeleton />;
  }

  return <StoryContent />;
};

export default Container;
