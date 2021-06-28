# 챕터 1-3 : 나의 첫번째 리액트 컴포넌트

> 참고 : https://react.vlpt.us/basic/03-first-component.html

#### 📕 주로 배운 내용

- 함수형 컴포넌트 생성

##### Hello.js

```
function Hello() {
  return <div>안녕하세요</div>
}

export default Hello;
```

<br>

- 함수 내보내기

```
export default Hello;
```

<br>

- 실제 DOM 내부에 리액트 컴포넌트가 렌더링되는 구조

##### index.js

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/*
ReactDom.render : 실제 DOM 내부에 리액트 컴포넌트를 렌더링하겠다는 의미
- Index.html 내부에 id가 root인 div 태그가 있으며, 실제로 이곳에 렌더링된다.
*/
ReactDOM.render(<App />, document.getElementById("root")
);

reportWebVitals();
```

<br>

- 컴포넌트의 재사용성

##### App.js

```
import Hello from './Hello';

function App() {
  return (
    <div>
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}

export default App;
```
