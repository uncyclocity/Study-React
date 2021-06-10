// Hello 컴포넌트 가져옴
import Hello from "./components/Hello";

function App() {
  // 태그 하나 리턴: 괄호, 별도 태그 랩 없이 가능
  // return <Hello />;

  /*
  태그 여러 개 리턴 : 괄호와 태그로 감싸야함
  - 태그는 항상 닫혀있어야 한다. <div>만 냅둘 경우 오류 발생
  - 태그와 태그 사이를 감싸지 않을 경우, self closing(<component/>) 태그를 사용한다.
  - 태그 안의 내용은 해당 컴포넌트 함수에서 children 으로 불러올 수 있다.
  */
  return (
    <div>
      <Hello />
      <Hello>반가워요</Hello>
      <Hello>잘있어요</Hello>
      <Hello>잘있어요</Hello>
    </div>
  );
}

// App 함수 컴포넌트를 외부에서 "가져오기" 할 수 있도록 하겠다는 의미
export default App;
