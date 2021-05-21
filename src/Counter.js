// 리액트 패키지에서 'useState' 라는 함수를 불러와줌
import {useState} from 'react';

function Counter() {
    // 컴포넌트에서 동적인 값은 '상태'라고 부른다
    // 'useState'를 이용하면 컴포넌트에서 상태 관리를 할 수 있다.
    // 즉, 동적인 값을 조작할 수 있다는 것이다.
    // 배열 비구조화 할당을 통해 useState 함수의 반환값인 배열에서 각 원소를 추출하였음
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
        setNumber(number - 1);
    }

    const onDecrease = () => {
        // 함수형 업데이트 : 값을 업데이트 하는 함수를 파라미터로 넣어주었다.
        // setNumber 함수에 파라미터로 함수를 넣어 줄 경우, 이전 값을 넣어주는 것으로 개발이 되어 있음
        setNumber(prevNumber => prevNumber + 1);
    }

    return (
        <div>
            <h1>{number}</h1>
            {/* 리엑트에서 엘리먼트에 이벤트를 설정해줄 때는 on이벤트이름 = {실행할함수} 형식으로 설정해주어야 한다 */}
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;