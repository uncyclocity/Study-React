import "./App.scss";
import Button from "./components/Button";

function App() {
  return (
    <div className="App">
      <div className="buttons">
        <Button size="large" onClick={() => console.log("안녕 클릭이 됐어.")}>
          나는 버튼이다
        </Button>
        <Button>나는 버튼이다</Button>
        <Button size="small">나는 버튼이다</Button>
      </div>
      <div className="buttons">
        <Button size="large" color="gray">
          나는 버튼이다
        </Button>
        <Button color="gray">나는 버튼이다</Button>
        <Button size="small" color="gray">
          나는 버튼이다
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" color="pink">
          나는 버튼이다
        </Button>
        <Button color="pink">나는 버튼이다</Button>
        <Button size="small" color="pink">
          나는 버튼이다
        </Button>
      </div>
      <div className="buttons">
        <Button size="large" outline>
          나는 버튼이다
        </Button>
        <Button color="gray" outline>
          나는 버튼이다
        </Button>
        <Button size="small" color="pink" outline>
          나는 버튼이다
        </Button>
      </div>
      <div className="buttons">
        <Button fullwidth>나는 버튼이다</Button>
        <Button color="gray" fullwidth>
          나는 버튼이다
        </Button>
        <Button color="pink" fullwidth>
          나는 버튼이다
        </Button>
      </div>
    </div>
  );
}

export default App;
