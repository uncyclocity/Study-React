# 챕터 1-7 : useState 를 통해 컴포넌트에서 바뀌는 값 관리하기

> 참고 : https://react.vlpt.us/basic/07-useState.html

#### 📕 주로 배운 내용

- 이벤트 설정

  - `on이벤트이름={실행할 함수}` 형식으로 작성하여야 한다.
  - `onClick={onIncrease}`처럼 함수타입의 값을 넣거나,`onClick={() => num + 1}`처럼 함수를 통째로 넣어도 된다.
  - `onClick={onIncrease()}`와 같이 함수 실행 코드를 넣으면, 값이 바뀌고 렌더링이 되는 작업이 무한루프로 돌게 된다.
    👉 이러한 무한 루프는 React 시스템에서 제한하고 있으며, `Too many re-renders. React limits the number of renders to prevent an infinite loop.`이라는 오류 페이지를 볼 수 있을 것이다.

  ##### Counter.js

  ```{.javascript}
  function Counter() {
    const onIncrease = () => {
        console.log('증가');
    };

    const onDecrease = () => {
        console.log('감소');
    };

    return (
      <div>
        <h1>0</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    );
  }

  export default Counter;
  ```

  <br>

- `useState`를 이용한 상태 관리

  - 컴포넌트에 있어 동적인 값은 '상태'라고 부르며, `useState`를 사용하면 컴포넌트에서 상태 관리를 할 수 있다.

  ##### Counter.js

  ```{.javascript}
  import { useState } from 'react';

  function Counter() {
    /*
      const numState = useState(0);
      const num = numState[0];
      const setNum = numState[1];
      위의 과정들을 '배열 비구조화 할당'을 통해 아래 한줄로 축약함
    */
    const [num, setNum] = useState(0);

    /*
      Setter 함수의 파라미터에 값 넣기
      const onIncrease = () => {
        setNum(num + 1);
      };

      const onDecrease = () => {
        setNum(num - 1);
      };
    */

    /*
      함수형 업데이트: 기존 값이 인자로 들어옴
      차후에 컴포넌트를 최적화 할 때 필요하다(해당 내용 복습 후 간단 서술 필요)
    */
    const onIncrease = () => {
      setNum((preNum) => preNum + 1);
    };

    const onDecrease = () => {
      setNum((preNum) => preNum - 1);
    };

    return (
      <div>
        <h1>{num}</h1>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    );
  }

  export default Counter;
  ```
