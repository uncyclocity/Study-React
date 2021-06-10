import Hello from "./components/Hello";
import Wrapper from "./components/Wrapper";

/*
  props
  - 컴포넌트에 원하는 특정 값이나 스타일을 전달할 수 있다.
  - 컴포넌트에 유효한 props에 값을 전달하지 않있을 경우를 대비하여 Component.defaultProps로 기본 값을 정의할 수 있다.
  - 기본적으로 props의 개수와 상관없이 객체로 전달된다. 비구조 할당을 통해 각 변수에 객체의 값들을 할당할 수 있다.
*/

function App() {
  return (
    // Wrapper : children을 감싸는 박스 역할
    <Wrapper
    // 컴포넌트 열림/닫힘 사이의 내용을 props.children로 전달함
    >
      <Hello name="uncyclocity" color="pink" />
      <Hello name="yoongKim" color="pink" />
    </Wrapper>
  );
}

export default App;
