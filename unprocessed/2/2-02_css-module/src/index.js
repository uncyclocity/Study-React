import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/*
ReactDom.render : 실제 DOM 내부에 리액트 컴포넌트를 렌더링하겠다는 의미
- Index.html 내부에 id가 root인 div 태그가 있으며, 실제로 이곳에 렌더링된다.
*/
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
