# 챕터 1-24 : 클래스형 컴포넌트

> 참고 <br> https://react.vlpt.us/basic/24-class-component.html <br> https://xiubindev.tistory.com/107

#### 📕 주로 배운 내용

- 클래스형 컴포넌트

  - 현재는 함수형 컴포넌트와는 달리 자주 쓰이지 않는 방식이다.
  - 항상 **`render()` 메서드**가 있어야 하며, 이 내부에서 JSX 코드를 리턴한다.
  - `this.props`객체에 props로 넘겨받은 값이 저장된다.
    ```
    const { name, color, isSpecial } = this.props;
    ```
  - `defaultProps`(props 기본 값 지정)는 함수형 컴포넌트처럼 컴포넌트 외부에서 사용하거나, 하단의 코드와 같이 `static` 키워드를 이용하여 컴포넌트 내부에서 사용한다.
    ```
    static defaultProps{
      name: "Unknown"
    };
    ```

<br>

- 클래스형 컴포넌트 시작

  - Component를 import 해준다.

    ```
    import React, { Component } from "react";
    ```

  - 기본 구조
    ```
    class 컴포넌트명 extends Component {
      ...
      render() {
        ...
        return (
          // JSX 반환
        );
      }
    }
    ```

<br>

- 이벤트 핸들링

  - 클래스 내부에 이벤트 함수를 선언하여, JSX 객체 내부에서 이를 전달한다.
    (클래스 내부의 함수를 **메서드**라고 하며, 이러한 이벤트 함수를 **커스텀 메서드**라고 한다)
  - 대부분 `handle`로 시작하는 이름을 지정하며, camelCase 형태로 작성한다.
  - 보통 `render()` 바깥에 함수를 작성하는 편이다.

    ```
    class Counter extends Component {

      // 커스텀 메서드 선언
      handleIncrease() {
        console.log("handleIncrease()");
      }

      handleDecrease() {
        console.log("handleDecrease()");
      }

      render() {
        return (
          <>
            <h1>0</h1>
            {/*
              커스텀 메서드를 DOM의 이벤트로 등록하면, this가 컴포넌트를 가리키기 않게 된다.
              이를 해결하는 방법은 '이벤트 핸들러와 this' 참고
            */}
            <button onClick={this.handleIncrease}>+1</button>
            <button onClick={this.handleDecrease}>-1</button>
          </>
        );
      }
    }
    ```

<br>

- 이벤트 핸들러와 `this`

  - 상단 코드의 커스텀 메서드에서 `this`를 조회할 경우, `undefined`가 조회된다.<br>
    👉 DOM의 이벤트로 등록되는 과정에서 **메서드-컴포넌트 인스턴스 간 관계가 끊어지기 때문이다.**
  - `this`가 컴포넌트 인스턴스를 가리키도록 작업하기
    1. 생성자 메서드(`constructor`)에서 bind해주기
       ```
       class Counter extends Component {
         constructor(props) {
           super(props);
           this.handleIncrease = this.handleIncrease.bind(this);
         }
         handlerIncrease() {
             console.log(this);
         }
         render() {...}
       }
       ```
    2. 커스텀 메서드를 화살표 함수로 만들기(class-properties 문법 지원 환경에서 사용 가능)
       ```
       class Counter extends Component {
         ...
         handlerIncrease = () => {
           console.log(this);
         }
         render() {...}
       }
       ```

<br>

- `this.state`

  - 클래스형 컴포넌트에서 **상태를 관리할 때 사용하는 객체**이다. 값의 개수와 상관없이 무조건 객체 형태여야만 한다.
    ```
    this.state = {
      counter: 0,
      fixed: 1
    };
    ```
  - 보통 생성자 메서드 내부에서 선언한다.
  - CRA 프로젝트와 같이 class-properties 문법을 지원하는 환경이라면 생성자 함수 밖에서 선언할 수 있다.

<br>

- `this.setState()`

  - 클래스형 컴포넌트에서 **상태를 업데이트**할 때 사용하는 함수이다.
    ```
    this.setState(
      {
        counter: this.state.counter + 1
      };
    )
    ```
  - 함수형 컴포넌트의 업데이트 방식과는 달리, **업데이트가 필요한 객체 값만 업데이트** 해주어도 된다. 이외의 값은 유지된다.
  - **함수형 업데이트**를 사용할 수 있으며, 이 경우에는 `setState` 함수를 여러 번 사용할 수 있다.

    ```
    handlerDoubleIncrease = () => {
      this.setState(state => ({
        counter: this.state.counter + 1
      }));
      this.setState(state => ({
        counter: this.state.counter + 1
      }));
    }

    // 결과 : counter에 1이 2번 더해짐
    ```
