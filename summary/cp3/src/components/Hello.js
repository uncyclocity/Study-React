/*
컴포넌트에는 객체 형태로 props가 전달되며, props.ㅇㅇㅇ 형태로 조회가 가능하다. 
function Hello(props) {
  return <div style={{ color: props.color }}>{props.name}</div>;
}
*/

// 아래처럼 비구조 할당 개념을 통해 각 props 값을 가져올 수 있다.
/*
  Q. 왜 중괄호가 두 개 들어가나요?
  A.
  - 바깥 중괄호 : JSX에서 JS 변수 값 사용하는 문법
  - 안쪽 중괄호 : 객체 리터럴 문법(인라인 스타일링을 위한 객체 생성 및 적용))
*/
function Hello({ name, color }) {
  return <div style={{ color }}>저는 {name} 입니다.</div>;
}

/*
Component.defaultProps
- 컴포넌트에 props 값을 지정하지 않았을 경우의 각 기본값을 정의함
- 당연히 props.children의 기본 값 또한 지정이 가능하다.
*/

Hello.defaultProps = {
  name: "unknown",
};

export default Hello;
