// 상태를 바꾸는 useState 함수, DOM을 참조하는 useRef 함수 import
// Hook 들을 사용하기 위해 import해 주었다
import {useState, useRef} from 'react';

function InputSample () {
    // 각각의 input에 대해 값을 지정함
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    }); 

    // name Input DOM을 선택하기 위해 useRef 함수 사용
    const nameInput = useRef(null);

    // 비구조화 할당 이용하여 각 input의 값을 추출함
    const { name, nickname } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        console.log(value + ", " + name);
        console.log(inputs);
        // 기존 객체를 수정하는 방식이 아닌, 새 객체를 만들어서 불변성을 지킨다.
        // 만약, input[name] = value 방식으로 했으면 값을 변경해도 리렌더링이 되지 않음
        setInputs({
            // ES6 -> Spread 이용하여 객체의 내용을 모두 펼쳐서 기존 객체를 복사함
            ...inputs,
            // name 키를 가진 값을 value로 설정함
            [name]: value
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        });

        nameInput.current.focus();
    };

    return (
        <div>
            {/* ref 속성을 통해 nameInput이 name input을 참조하도록 설정 */}
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}

export default InputSample;