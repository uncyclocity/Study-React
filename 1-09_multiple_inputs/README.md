# 1-9. 여러개의 input 상태 관리하기

> _References_ <br> https://react.vlpt.us/basic/09-multiple-inputs.html

## 📕 주로 배운 내용

- ### 여러개의 상태 관리하기

  - 상태를 객체로 지정하여 **복수의 값을 동적으로 관리할 수 있다.**

    ```javascript
    const [state, setState] = useState({
      name: "백괴",
      address: "성남시",
    });
    ```

<br>

- ### spread 연산자로 복수의 값을 관리할 때의 불변성 지키기

  - 상태의 불변성을 지키기 위해서는, **새로운 객체**를 상태로 지정해주어야 한다.
  - spread 연산자는 배열/객체 요소들의 **원시값**을 다른 배열/객체로 복붙해준다.

    ```javascript
    const arr = [1, 2, 3, 4];
    const arr_plus = [...arr, 5, 6];

    console.log(arr_plus);
    ```

    <center> ⬇ </center>

    ```bash
    [1, 2, 3, 4, 5, 6]
    ```

  - 이를 통해 **기존 객체의 값을 복붙하고 원하는 부분만 다른 것으로 바꿈**으로서, 불변성을 지킨 state 객체 수정을 이루어낼 수 있다.
  - 같은 3점 연산자인 rest와 햇갈릴 수 있으나 역할은 전혀 다르다. <br> (rest에 대한 설명은 <a href="https://github.com/uncyclocity/study_react/tree/main/1-05_props">챕터 1-5</a> 참고)
  - 활용 예시

    ```javascript
    /* 기존 객체의 키값을 spread로 복붙하고,
    변경 할 key(name)의 값만 새로 지정한 객체를 상태로 지정해주었다. */
    setState({
      ...state,
      name: "흑괴",
    });
    ```

<br>

- ### 「이벤트 객체 × 여러개의 input 상태 관리」 예제

  - <a href="https://github.com/uncyclocity/study_react/tree/main/1-08_manage-input">이전 챕터</a>의 예제 코드를 변형하였다.
  - 두 개의 input 태그 中 입력값이 변경 된 input 태그를 가리키는 키값을 갱신해준다.
  - `App` 컴포넌트는 생략

    **`InputSample.js`**

    ```javascript
    import { useState } from "react";

    export default function InputSample() {
      const [inputs, setInputs] = useState({
        fullname: "",
        nickname: "",
      });

      // 객체 비구조 할당(1) : 상태 객체의 각 값을 가져옴
      const { fullname, nickname } = inputs;

      const onChange = (e) => {
        // 객체 비구조 할당(2) : 이벤트가 발생한 input 태그의 name, value 값을 가져옴
        const { name, value } = e.target;

        /* spread operator로 기존 상태 객체의 키값들을 가져오고,
        그중에서도 이벤트 발생 input 태그를 가리키는 키값만 변경해주었음 */
        useState({
          ...inputs,
          [name]: value,
        });
      };

      const reset = () => {
        useState({
          fullname: "",
          nickname: "",
        });
      };

      return (
        <div>
          <input name="fullname" value={fullname} onChange={onchange} />
          <input name="nickname" value={nickname} onChange={onchange} />
          <button onClick={reset}>초기화</button>
          <div>
            <b>값 : </b>
            {nickname ? fullname + "(" + nickname + ")" : fullname}
          </div>
        </div>
      );
    }
    ```
