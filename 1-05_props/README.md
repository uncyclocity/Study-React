# 1-5. props를 통해 컴포넌트에게 값 전달하기

> _References_ <br> https://react.vlpt.us/basic/05-props.html

## 📕 주로 배운 내용

- ### props 기본 규칙

  - props를 통해 **원하는 오브젝트를 컴포넌트에 전달하여 사용할 수 있다.**

    ```javascript
    <Hello name="uncyclocity" />
    ```

  - props로 넘긴 오브젝트는 해당 컴포넌트의 **`props` 객체**에 저장된다.

    ```javascript
    export default function Hello(props) {
      return <div>저의 이름은 {props.name} 입니다.</div>;
    }
    ```

  - `defaultProps` 객체에 각 props의 기본값을 지정할 수 있다.

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

      ```javascript
      export default function Between({ children }) {
        const style = {
          display: "flex",
          justifyContent: "space-between",
        };

        return <div style={style}>{children}</div>;
      }
      ```

      <center>⬇</center>

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

    - `...rest`에는 객체/배열의 요소 中 **비구조화 할당에서 별도로 명시하지 않은 나머지 요소**들이 들어간다. (꼭 이름이 `rest`일 필요는 없다.)
    - 같은 3점 연산자인 `spread`와 햇갈릴 수 있으나 역할은 전혀 다르다. (spread는 <a href="https://github.com/uncyclocity/study_react/tree/main/1-09_multiple_inputs">챕터 1-9</a> 참고)

      ```javascript
      <Button name="그냥버튼" onClick={() => console.log("버튼눌림")}>
      ```

      ```javascript
      export default function Button({ name, ...rest }) {
        // onClick은 rest로 들어간다 ➡ 버튼 눌리면 정상적으로 "버튼눌림"이 콘솔에 출력된다.
        return <button {...rest}>{name}</button>;
      }
      ```
