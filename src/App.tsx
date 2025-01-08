import Container from "./components/container.component";
import "./App.css";
import { StoriesProvider } from "./context/stories.context";

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
