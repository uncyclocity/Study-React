import Hello from "./components/Hello";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <Wrapper>
      {/*
        <Hello name="uncyclocity" color="pink" isSpecial={true} />
        아래의 예시대로 props 이름만 입력하고 값 셋팅을 생략한다면 true가 자동셋팅된다.
      */}
      <Hello name="uncyclocity" color="pink" isSpecial />
      <Hello color="pink" />
    </Wrapper>
  );
}

export default App;
