# 14. React.memo로 컴포넌트 리렌더링 최소화하기

> _References_ <br> https://react.vlpt.us/basic/19-React.memo.html <br> https://xiubindev.tistory.com/103 <br> https://ui.toast.com/weekly-pick/ko_20190731

## 📕 주로 배운 내용

- ### `React.memo()`

  - **props**가 바뀌지 않은 함수형 컴포넌트의 **불필요한 리렌더링을 방지**하는 함수이다.

<br>

- ### `React.memo` 함수의 구조

  ```javascript
  React.memo(component[, propsAreEqual]);
  ```

  - **`component`** : 불필요한 리렌더링을 방지하고자 하는 컴포넌트
  - **`propsAreEqual`** : props 객체 내부의 특정 값들만 비교하기 위해 **비교 방식**을 정의하는 함수

<br>

- ### `React.memo` 사용하기

  - `React`를 import 해야 사용이 가능하다.

    ```javascript
    import React from "react";
    ```

  - 컴포넌트 함수를 `React.memo` 함수로 감싸서 사용한다.

    ```javascript
    function Component01() {...}
    export default React.memo(Component01);
    ```

    ```javascript
    const Component02 = React.memo(function Component02(props) {...});
    ```

  - 두 번째 파라미터에 props 비교 함수를 넣어 리렌더링의 기준을 정할 수 있다.

    - 함수의 인자로 각각 **기존 props**와 **변경 된 props**가 들어간다.

      ```javascript
      // 과거와 현재 props의 items01과 items02가 같으면 리렌더링!
      function compareFunc(prevProps, nextProps) {
        prevProps.items01 === nextProps.items01 &&
          prevProps.items02 === nextProps.items02;
      }
      ```

      ```javascript
      export default React.memo(Component01, compareFunc);
      ```

<br>

- ### 함수형 업데이트를 이용한 불필요한 렌더링 방지 in `useCallback`

  - `useCallback`의 `deps` 배열 내 값이 변경되면 해당 값을 참조하고 있는 함수들이 재생성된다.
  - 함수형 업데이트는 상태 setter 함수 내부에 값이 아닌 **값을 업데이트하는 콜백 함수**를 넘겨준다. <br> 👉 deps 내부에 값을 넣어주지 않아도 된다.

    **Before**

    ```javascript
    const Example = useCallback(() => {
      setState(items.concat(item));
    }, [items]);
    ```

    **After**

    ```javascript
    const Example = useCallback(() => {
      setState((items) => items.concat(item));
    }, []);
    ```
