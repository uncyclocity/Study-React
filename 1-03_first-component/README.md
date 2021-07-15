# 1-3. 나의 첫번째 리액트 컴포넌트

> _References_<br> https://react.vlpt.us/basic/02-prepare.html <br> https://react.vlpt.us/basic/03-first-component.html

## 📕 주로 배운 내용

- ### CRA 프로젝트 생성

  ```
  $ npx create-react-app 디렉터리명
  ```

  - **npm이 설치되어 있는 환경**에서 위와 같이 명령어를 입력하면, CRA 프로젝트를 만들 수 있다.
  - 보통 JS 및 스타일링 코드의 경우, CRA 프로젝트 내부의 **`src` 디렉터리**에서 생성해준다.

<br>

- ### 함수형 컴포넌트 생성

  **`Hello.js`**

  ```javascript
  function Hello() {
    // 뷰를 정의하는 「JSX 코드」 반환
    return <div>안녕하세요</div>;
  }

  // 「Hello」 컴포넌트 함수를 내보내주었다.
  export default Hello;
  ```

  - 함수형 컴포넌트는 **JSX**를 반환한다,<br>
    JSX는 리액트에서 **뷰를 정의할 때 사용되는 문법**이며, HTML과 약간의 문법 차이가 존재한다. 자세히는 <a href="">챕터 1-4</a> 참고
  - 컴포넌트 함수를 **`export`를 이용하여 내보내주었다.** 이는 다른 파일에서 `import`를 통해 해당 컴포넌트를 불러올 수 있도록 한다.<br>
    여기서 `default`는 기본값으로 사용한다는 의미이며, 기본값 여부에 따라 추후 다른 파일에 불러올 때 차이가 생긴다.

    ```javascript
    import Hello from "./Hello"; //기본값 O
    ```

    ```javascript
    import { Hello } from "./Hello"; //기본값 X
    ```

<br>

- ### 실제 DOM 내부에 리액트 컴포넌트가 렌더링되는 구조

  - `ReactDom.render`를 통해 실제 DOM으로 리액트 컴포넌트를 렌더링을 수행한다.
  - `public` 폴더 내부의 `index.html`에 랜더링이 진행되며, id가 `root`인 div 태그가 대상이다.

    **`index.js`**

    ```javascript
    import React from "react";
    import ReactDOM from "react-dom";
    import App from "./App";
    import reportWebVitals from "./reportWebVitals";

    /* ReactDom.render : 실제 DOM 내부에 리액트 컴포넌트를 렌더링하겠다는 의미
    - Index.html 내부에 id가 root인 div 태그가 있으며, 실제로 이곳에 렌더링된다. */
    ReactDOM.render(<App />, document.getElementById("root"));

    reportWebVitals();
    ```

<br>

- ### 컴포넌트의 재사용성

  - 컴포넌트는 여러 번 재사용할 수 있다.

    ```javascript
      return (
        // 배열 렌더링(챕터 1-11 참고)
        // users 배열의 각 요소를 배열 길이만큼 루프를 돌며 렌더링하는 코드이며, 「User」 컴포넌트의 반복이 이루어진다.
        <div>
          {users.map(user => (
            <User user={user} key={index} />
          ))
        </div>
      );
    ```
