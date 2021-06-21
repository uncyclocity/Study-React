# 챕터 1-21 : 커스텀 Hooks 만들기

> 참고 : https://react.vlpt.us/basic/21-custom-hook.html

#### 📕 주로 배운 내용

- 커스텀 Hooks
  - 반복되는 로직을 Hook으로 만들어 손쉽게 재사용하도록 만들 수 있다.
  - 간단히 원하는 기능을 Hooks 등을 통해 구현하고, 사용하길 원하는 값을 배열에 집어넣어 반환하면 된다.
  - 보통 여느 Hooks 처럼 `use`로 시작하는 파일을 만든 뒤 이를 반환하는 형태이다.

<br>

- 사용 예시

  - `src` 디렉터리 내부에 `hooks`라는 디렉터리를 만들고, 이 안에 hook이 될 파일을 만든다.
  - 아래의 예시는 input 값에 대한 셋팅 로직이 담긴 커스텀 Hook이다.

    ##### hooks/useInputs.js

    ```{.javascript}
    import { useState, useCallback } from 'react'

    function useInputs(initialState) {
      // 받아 온 input 폼의 초기값을 상태로 설정
      const [form, setForm] = useState(initialState);

      // input 값의 내용이 바뀌었을 경우 상태 변경
      const onChange = useCallback(e => {
        const [name, value] = e.target;
        setForm({
          ...form,
          [name]: value,
        });
      });

      // input 값의 내용을 초기화할 경우 상태 변경
      const onInit = useCallback(() => {
        setForm(initialState);
      });

      // 상태, 두 함수를 배열에 넣어 반환
      return [form, onChange, onInit];
    }

    export default useInputs;
    ```

  - 외부 컴포넌트 파일에서 커스텀 Hook을 불러오기

    ```{.javascript}
    import useInputs from "./hooks/useInputs";
    ```

  - 외부 컴포넌트 파일에서 커스텀 Hook을 사용하기

    ```{.javascript}
    const [{ usename, emmail }, onChange, onInit] = useInputs({
      username: "",
      email: "",
    });
    ```
