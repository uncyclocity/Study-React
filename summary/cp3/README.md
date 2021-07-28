# 3. props를 통해 컴포넌트에게 값 전달하기

> _References_ <br> https://react.vlpt.us/basic/05-props.html

## 📕 주로 배운 내용

- ### props 기본 규칙

  - props를 통해 **원하는 값을 컴포넌트에 전달**하여 사용할 수 있다.

    ```javascript
    <Hello name="uncyclocity" />
    ```

  - props로 넘긴 오브젝트는 해당 컴포넌트의 **`props` 객체**에 저장된다.

    ```javascript
    export default function Hello(props) {
      return <div>저의 이름은 {props.name} 입니다.</div>;
    }
    ```

  - `defaultProps` 객체에 각 props의 **기본값**을 명시할 수 있다. <br> 👉 props로 받는 값이 없을 경우 해당 기본값이 적용된다.

    ```javascript
    export default function Hello(props) {
      return <div>저의 이름은 {props.name} 입니다.</div>;
    }

    Hello.defaultProps = {
      name: "unknown",
    };
    ```

<br>

- ### 비구조화 할당 문법 응용

  - **객체 비구조화 할당** 문법을 통해 props 객체의 키값들을 각각의 변수에 할당할 수 있다.

    ```javascript
    export default function Hello({ name }) {
      return <div>저의 이름은 {name} 입니다.</div>;
    }
    ```

  - 컴포넌트의 자식 요소는 `props.children`에 저장이 된다.

    - 예시) 두 개의 자식 요소를 양옆으로 고정하는 컴포넌트 `Between`

      **`Between.js`**

      ```javascript
      export default function Between({ children }) {
        const style = {
          display: "flex",
          justifyContent: "space-between",
        };

        return <div style={style}>{children}</div>;
      }
      ```

      **`App.js`**

      ```javascript
      import Between from "./components/Between";

      export default function App() {
        return (
          <Between>
            <p>왼쪽</p>
            <p>오른쪽</p>
          </Between>
        );
      }
      ```

  - rest 연산자 활용

    - `...rest`에는 객체/배열의 요소 中 **비구조화 할당에서 별도로 명시하지 않은 나머지 요소**들이 들어간다. <br> (꼭 이름이 `rest`일 필요는 없다.)

      ```javascript
      const arr = [1, 2, 3, 4];
      const [one, two, ...rest] = arr;

      console.log(rest);
      ```

      **콘솔 출력 결과**

      ```bash
      [3, 4]
      ```

    - 같은 3점 연산자인 `spread`와 햇갈릴 수 있으나 역할은 전혀 다르다. <br> (spread에 대한 설명은 <a href="https://github.com/uncyclocity/study_react/tree/main/summary/cp7">챕터 7</a> 참고)

    - 활용 예시

      ```javascript
      <Button name="그냥버튼" onClick={() => console.log("버튼눌림")}>
      ```

      ```javascript
      export default function Button({ name, ...rest }) {
        /* onClick이 rest에 들어있으며, 이를 button 태그의 속성으로 등록하였다
        ➡ 버튼 눌리면 정상적으로 "버튼눌림"이 콘솔에 출력된다. */
        return <button {...rest}>{name}</button>;
      }
      ```
