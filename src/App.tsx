import { StoriesProvider } from "./context/stories.context";
import Container from "./components/container.component";

import "./App.css";

const App = () => {
  return (
    <>
      <StoriesProvider>
        <Container />
      </StoriesProvider>
    </>
  );
};

export default App;
