import { Component } from "react";

class Counter extends Component {
  /*
    constructor(props) {
      super(props);
      
      // 클래스 컴포넌트의 상태관리 : 생성자 메서드에서 state를 선언한다.
      // state는 무조건 객체형태여야만 한다.
      this.state = {
        counter: 0,
      };

    
      // 생성자 메서드를 사용하면, 각 메서드가 가르킬 this를 직접 설정해 줄 수 있음
      this.handleIncrease = this.handleIncrease.bind(this);
      this.handleDecrease = this.handleDecrease.bind(this);
    }
  */

  // class-properties 문법이 적용되어 있으면 생성자 함수 없이 state 설정이 가능하다.
  state = {
    counter: 0,
    fixed: 1,
  };

  /*
    메서드 : 클래스 내부에 종속 된 함수
    - render() 함수 내부에 선언하기보단, 바깥(클래스 내부)에 선언하는 편이다.
    - 보통 이름을 handle로 시작하는 편이다.
  */
  handleDecrease = () => {
    /*
      this가 undefined로 뜬다
      = 각 버튼들의 이벤트로 등록하게 되는 과정에서 메서드-컴포넌트 인스턴스 간 관계가 끊기기 때문

      해결 방법
      1. 생성자 메서드 constructor에서 각 커스텀 메서드에 대해 bind 작업을 해준다. (최상단 5줄 참고)
      2. 커스텀 메서드를 화살표 함수로 작성한다. (class-properties 문법 사용, 정식 JS 문법은 아니나 CRA 플젝에는 적용되어 있음)

      상태를 업데이트하려면 this.setstate 함수를 사용한다.
      - 함수 컴포넌트에서의 상태 지정과는 달리, 원하는 값만 바꾸어주어도 다른 값들은 상태가 유지된다.
      - 상태 업데이트 이후 특정 작업을 하고 싶다면, setState의 두 번째 파라미터에 콜백함수를 넣어주면 된다.
    */
    this.setState(
      {
        counter: this.state.counter - 1,
      },
      () => {
        console.log("handleDecrease() 실행 결과 : " + this.state.counter);
      }
    );
  };

  handleIncrease = () => {
    /*
      setState의 함수형 업데이트
      - setState를 여러 번 걸쳐서 해야 할 경우에 유용함
      - 함수형 업데이트를 사용하지 않고 setState를 여러 번 걸쳐 사용할 경우 한 번 사용한 결과와 같다.
        => setState는 상태를 바꾸는 함수가 아닌, 상태를 바꿀 것을 요청하는 함수로 이해를 하면 된다.
    */
    this.setState((state) => ({
      counter: state.counter + 1,
    }));
    this.setState((state) => ({
      counter: state.counter + 1,
    }));
  };

  render() {
    return (
      <>
        <h1>{this.state.counter}</h1>
        <button onClick={this.handleIncrease}>+2</button>
        <button onClick={this.handleDecrease}>-1</button>
        <p>고정된 값 테스트 : {this.state.fixed}</p>
      </>
    );
  }
}

export default Counter;
