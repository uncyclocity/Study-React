import {useState} from 'react';

function InputSample () {
    const [text, setText] = useState('');

    const onChange = (e) => {
        // e.target은 이벤트가 발생한 DOM을 가리키며,
        // 이 돔의 value 값을 조회할 경우 현재 input에 입력된 값을 얻을 수 있음
        setText(e.target.value);
    };

    const onReset = () => {
        setText('');
    };


    return (
        <div>
            <input onChange={onChange} value={text}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: {text}</b>
            </div>
        </div>
    );
}

export default InputSample;