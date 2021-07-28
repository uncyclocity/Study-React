// children: 헤당 컴포넌트 태그 내부의 자손 값을 가져옴
function Hello({ children }) {
  return <div>{children}</div>;
}

/* 
defaultProps : props 기본 값을 정의함
아래에서 볼 수 있듯이 본 컴포넌트의 자식 값을 가리키는 children의 기본 값도 정의가 가능하다.
Hello 컴포넌트에 props 값을 지정하지 않았을 경우 아래의 기본 값이 props에 전달된다.
*/

Hello.defaultProps = {
  children: "안녕하세요",
};

// Hello 함수 컴포넌트를 외부에서 "가져오기" 할 수 있도록 하겠다는 의미
export default Hello;
