# 챕터 1-26 : componentDidCatch 로 에러 잡아내기

> 참고 : https://react.vlpt.us/basic/26-componentDidCatch-and-sentry.html

#### 📕 주로 배운 내용

- `componentDidCatch()` 기본 개념

  - 클래스형 컴포넌트에서 쓰이는 **생명 주기 메소드** 중 하나이다.
  - 에러가 발생할 경우 실행되어, 지정한 작업을 수행한다.

<br>

- 메소드의 구조
  ```
  componentDidCatch(error, info) { /* 수행시킬 작업 */ }
  ```
  - `error` : 에러의 내용
  - `info` : 에러가 발생한 주소

<br>

- 사용 예시 : 에러 리포트 역할의 클래스형 컴포넌트를 별도로 만들어 활용하기

  ##### App.js

  ```{.javascript}
  import ErrorBoundary from "./components/ErrorBoundary";
  import User from "./components/User";

  function App() {
    const user = {
      username: "Uncyclocity",
      id: 1
    };

    return (
      <ErrorBoundary>
        { /* 에러 발생 유도를 위해 props로 user 객체를 넘기지 않음 */ }
        <User />
      </ErrorBoundary>
    );
  }
  ```

  ##### components/ErrorBoundary.js

  ```{.javascript}
  import { Components } from "react";

  class ErrorBoundary extends Component {
    this.state{
      error: false
    };

    componentDidCatch(error, info) {
      console.log("에러 발생을 알리는 콘솔 메세지");
      console.log({
        error,
        info
      });

      this.setState({
        error: true
      });
    }

    render() {
      if (this.state.error) {
        return <h1>에러발생!</h1>;
      }
      return this.props.children;
    }
  }
  ```
