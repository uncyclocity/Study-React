import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 실제 DOM 내부에 리액트 컴포넌트를 랜더링하겠다는 것을 의미함
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // public/index.html 내부의 id가 root인 div 태그 내부에 랜더링 됨
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
