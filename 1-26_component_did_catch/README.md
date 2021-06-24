# 챕터 1-26 : componentDidCatch 로 에러 잡아내기

> 참고 : https://react.vlpt.us/basic/26-componentDidCatch-and-sentry.html

#### 📕 주로 배운 내용

- `componentDidCatch()` 기본 개념

  - 클래스형 컴포넌트에서 쓰이는 **생명 주기** 메소드 중 하나이다.
  - 에러가 발생할 경우 실행되어, 지정한 작업을 수행한다.

<br>

- 메소드의 구조
  ```{.javascript}
  componentDidCatch(error, info) { /* 수행시킬 작업 */ }
  ```
  - error : 에러의 내용이 들어감
  - info : 에러가 발생한 주소가 들어감

<br>

- 사용 예시

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
        { /*
          props로 user 객체를 넣어주어야 하나,
          에러를 발생시키기 위해 넣어주지 않았음
          (User 내부에 defaultProps도 설정하지 않음)
        */ }
        <User />
      </ErrorBoundary>
    );
  }
  ```

  ##### components/ErrorBoundary.js

  ```{.javascript}
  import { Components } from "react";

  function ErrorBoundary({ user }) {
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
        return <h1>왕 에러가 발생했다맨이야</h1>;
      }
      return this.props.children;
    }
  }
  ```
