import "./App.scss";
import Button from "./components/Button";

function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button size="large" onClick={() => console.log("클릭됐다")}>
          I LOVE REFRIGERATOR
        </Button>
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
      <div className="buttons">
        <Button size="large" outline>
          I LOVE REFRIGERATOR
        </Button>
        <Button color="gray" outline>
          I LOVE REFRIGERATOR
        </Button>
        <Button size="small" color="pink" outline>
          I LOVE REFRIGERATOR
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" fullWidth>
          I LOVE REFRIGERATOR
        </Button>
        <Button size="large" color="gray" fullWidth>
          I LOVE REFRIGERATOR
        </Button>
        <Button size="large" color="pink" fullWidth>
          I LOVE REFRIGERATOR
        </Button>
      </div>
    </div>
  );
}

export default App;
