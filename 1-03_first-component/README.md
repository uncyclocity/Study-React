# 1-3. 나의 첫번째 리액트 컴포넌트

> _References_ <br> https://react.vlpt.us/basic/02-prepare.html <br> https://react.vlpt.us/basic/03-first-component.html <br> https://velog.io/@lua_aw/201105-2-React-보일러플레이트-CRACreate-React-App

## 📕 주로 배운 내용

- ### CRA 프로젝트 생성

  - CRA는 'create react app'의 약자로, 페이스북에서 제공하는 공식 **보일러플레이트 코드**이다. <br> 👉 보일러플레이트 코드란? **최소한의 변경으로 널리 사용되는 코드**를 말한다 <br> 변경이 거의 없는 리액트 앱을 생성하는 코드이며, 널리 사용되므로 CRA는 보일러플레이트라고 할 수 있다.
  - CRA는 npm의 CLI인 `npx` 명령어로 사용할 수 있으며, **환경 설정이 적용 된 프로젝트**를 만들어준다.
    ```bash
    $ npx create-react-app 디렉터리명
    ```
  - 보통 JS 및 스타일링 코드는 CRA 프로젝트 내부의 **`src` 디렉터리**에서 생성한다.

<br>

- ### 함수형 컴포넌트의 기본 구조

  **`Hello.js`**

  ```javascript
  function Hello() {
    // 뷰를 정의하는「JSX 코드」반환
    return <div>안녕하세요</div>;
  }

  // 컴포넌트 함수「Hello」를 내보내주었다.
  export default Hello;
  ```

  - 컴포넌트는 **JSX**를 반환한다, <br> JSX는 리액트에서 **뷰를 정의할 때 사용되는 문법**이며, HTML과 약간의 문법 차이가 존재한다. 자세히는 <a href="https://github.com/uncyclocity/study_react/tree/main/1-04_jsx">챕터 1-4</a> 참고
  - 컴포넌트 함수를 **`export`를 이용하여 내보내주었다.** 이는 다른 파일에서 **`import`를 통해 해당 컴포넌트를 불러올 수 있도록 한다.**<br>

    ```javascript
    export default Hello;
    ```

    여기서 `default`는 기본값으로 사용한다는 의미이며, 기본값 여부에 따라 추후 다른 파일에 불러올 때 차이가 생긴다.

    ```javascript
    import Hello from "./Hello"; // default
    ```

    ```javascript
    import { Hello } from "./Hello"; // not default
    ```

<br>

- ### 실제 DOM 내부에 리액트 컴포넌트가 렌더링되는 구조

  - `ReactDom.render`를 통해 실제 DOM으로 리액트 컴포넌트를 렌더링을 수행한다.
  - `public` 폴더 내부의 `index.html`에 랜더링이 진행되며, id가 `root`인 div 태그가 대상이다.
  - 서버를 켠 상태에서 컴포넌트를 수정하면 1~2초 이내에 변경 된 상태로 새로고침이 되며, 이러한 기술을 **Fast Refresh** 라고 한다.

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
      <>
        <Hello />
        <Hello />
        <Hello />
      </>
    );
    ```

    ```javascript
      return (
        /* 배열 렌더링 (챕터 1-11)
        users 배열 길이만큼 루프를 돌며
        배열 각 요소를 담은 User 컴포넌트들을 렌더링하는 코드이다. */
        <div>
          {users.map(user => (
            <User user={user} key={index} />
          ))
        </div>
      );
    ```
