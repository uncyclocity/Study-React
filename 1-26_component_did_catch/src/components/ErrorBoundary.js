import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  /*
    componentDidCatch(에러의 내용, 에러 발생 위치) { 수행시킬 작업 }
    - 에러를 감지하여 필요한 작업을 수행하는 생명주기 메서드이다.
    - 에러 발생 시, 사용자에게 에러 발생 알림 페이지를 띄울 수 있다.
    - 생명주기 메서드이기 때문에 클래스형 컴포넌트에만 사용할 수 있다.
  */
  componentDidCatch(error, info) {
    console.log("에러가 발생했다맨이야");
    console.log({
      error,
      info,
    });
    this.setState({
      error: true,
    });
  }

  /*
    this.state.error의 T/F에 따라 렌더링 내용이 바뀐다.
    접속 시, 우측 상단의 X를 누르면 에러 발생으로 렌더링 된 페이지를 볼 수 있다.
  */
  render() {
    if (this.state.error) {
      return <h1>에러 발생!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
