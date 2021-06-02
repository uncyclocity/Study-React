// 리액트 패키지에서 'useReducer' 라는 함수를 불러와줌
// 이를 사용하면 컴포넌트로부터 상태 업데이트 로직을 분리시킬 수 있음(컴포넌트 바깥/별개 문서도 OK)
import {useReducer} from 'react';

// 현재 상태와 액션 객체(type)를 받아, 새로운 상태를 반환하는 함수
function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

function Counter() {
    // useReducer(reducer 함수, 초기화 값)
    const [number, dispatch] = useReducer(reducer, 0);

    // dispatch : 액션을 발생시키는 함수
    const onIncrease = () => {
        dispatch({type: 'INCREMENT'});
    };

    const onDecrease = () => {
        dispatch({type: 'DECREMENT'});
    };

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
}

export default Counter;