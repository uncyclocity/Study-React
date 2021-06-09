import Hello from "./components/Hello";
// 외부 css 파일을 "가져오기"
import "./App.css";

function App() {
  const name = "Uncyclocity";
  const greeting = "Nice to meet you😊";

  // JSX 태그에 집어 넣을 인라인 스타일
  const style = {
    fontSize: 25, // 기본 단위는 px이다.
    color: "#47C83E",

    backgroundColor: "white",
    boxShadow: "0px 0px 30px #86E57F",
    borderRadius: "30px",

    width: "230px",
    padding: "4rem", // px가 아닌 다른 단위를 사용하려면 문자열로 지정해야한다.
  };

  /*
  JSX 태그 상식
  - 태그는 항상 닫혀있어야 한다. 여는 태그(예: <div>)만 냅둘 경우 오류 발생
  - Self Closing : 열리고 바로 닫히는 태그 (예: <component />)
  - 두개 이상의 태그는 항상 하나의 태그로 감싸져야 한다.
  - <div>가 좋지 않을 경우 리액트에서 제공하는 Fragment를 사용하면 됨 (형태: <> {내용} </>)
  */

  return (
    // JSX에 JS 변수 값을 보이고 싶다면, 변수에 중괄호를 씌운다.
    // 인라인 스타일은 객체 형대로 작성, camelCase 형태의 네이밍(예: background-color -> backgroundColor)
    <div style={style}>
      <Hello
      // 태그 안에서는 한줄주석을 이렇게 쓸 수도 있다.
      />
      <Hello>I'm {name} </Hello>
      <Hello>{greeting}</Hello>

      {/* CSS 클래스는 "class="가 아닌 "className="으로 설정해 주어야 한다. */}
      <div className="button">GOT IT!</div>
    </div>
  );
}

export default App;
