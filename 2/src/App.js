import "./App.scss";
import Button from "./components/Button";

function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button size="large">I LOVE REFRIGERATOR</Button>
        <Button>I LOVE REFRIGERATOR</Button>
        <Button size="small">I LOVE REFRIGERATOR</Button>
      </div>
      <div className="buttons">
        <Button size="large" color="gray">
          I LOVE REFRIGERATOR
        </Button>
        <Button color="gray">I LOVE REFRIGERATOR</Button>
        <Button size="small" color="gray">
          I LOVE REFRIGERATOR
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" color="pink">
          I LOVE REFRIGERATOR
        </Button>
        <Button color="pink">I LOVE REFRIGERATOR</Button>
        <Button size="small" color="pink">
          I LOVE REFRIGERATOR
        </Button>
      </div>
    </div>
  );
}

export default App;
