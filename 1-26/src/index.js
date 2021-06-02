import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/react";

// Sentry와 연동하여, 사용자 에러를 잡아내어 서버로 전송함
// 만약 프로덕션 환경에서 componentDidCatch로 에러를 잡아줬을 경우, Sentry에 전달되지 않음
Sentry.init({
  dsn: 'https://4c6eb8cfc060409e940dbffc05e7b914@o774454.ingest.sentry.io/5796375',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
