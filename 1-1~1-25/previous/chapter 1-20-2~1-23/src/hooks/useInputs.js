// 커스텀 Hook은 아래와 같이 원하는 Hook을 사용하여 기능을 구현하고,
// 컴포넌트에 사용하고 싶은 값을 리턴하면 된다.
import {useReducer, useCallback} from 'react';

function reducer (state, action) {
    switch(action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                [action.name]: action.value
            };
        case 'RESET_INPUT':
            return {
                ...state,
                username: '',
                email: ''
            };
        default:
            return state;
    }
}

function useInputs(initialForm) {
    const [state, dispatch] = useReducer(reducer, initialForm);

    const onChange = useCallback(e => {
        const {name, value} = e.target;
        dispatch({
            type: 'CHANGE_INPUT',
            name,
            value
        });
    }, []);

    const reset = useCallback(() => {
        dispatch({
            type: 'RESET_INPUT',
        })
    }, [])
    return [state, onChange, reset];
}

export default useInputs;