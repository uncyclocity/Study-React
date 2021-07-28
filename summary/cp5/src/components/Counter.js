// useState를 "가져오기" 하였다.
import { useState } from "react";

function Counter() {
  /*
    const numState = useState(0);
    const num = numState[0];
    const setState = numState[1];
    위의 과정을 ES6 문법인 "배열 비구조화 할당"을 통해 축약한 결과는 아래와 같다.
  */
  const [num, setState] = useState(0);

  /*
    Setter함수에 업데이트 값을 파라미터로 넣어주는 방식
    const onIncrease = () => {
      setState(num + 1);
    };

    const onDecrease = () => {
        setState(num - 1);
    };
  */

  // 기존 값의 변경 방법에 대해 정의 된 함수를 등록하는 방식: 이전 값이 인자로 전달된다.
  const onIncrease = () => {
    setState((preNum) => preNum + 1);
  };

  const onDecrease = () => {
    setState((preNum) => preNum - 1);
  };

  return (
    <div>
      <h1>{num}</h1>
      {/* 
        이벤트 설정 상식
        - 리액트에서 엘리먼트에 이벤트를 설정해줄 때는 on이벤트이름={실행할 함수} 형식으로 작성해야 한다.
        - 다만, onClick={onIncrease()}와 같이 써서 함수 실행코드를 넣어버리면...?
        = 1이 증가 -> 렌더링 -> 1이 증가 -> 렌더링...무한반복!
        - 따라서, 아래와 같이 함수타입의 값을 넣는 것이 맞다. () => {실행 코드} 형식으로 아에 함수 자체를 넣어줘도 된다.
      */}
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
