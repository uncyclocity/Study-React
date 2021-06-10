/*
컴포넌트에는 객체 형태로 props가 전달되며, props.ㅇㅇㅇ 형태로 조회가 가능하다. 
function Hello(props) {
  return <div style={{ color: props.color }}>{props.name}</div>;
}
*/

// 아래처럼 비구조 할당 개념을 통해 각 props 값을 가져올 수 있다.
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
