import {useState} from 'react';

function Counter() {
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
        setNumber(number + 1);
    }

    const onDecrease = () => {
        setNumber(number - 1);
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