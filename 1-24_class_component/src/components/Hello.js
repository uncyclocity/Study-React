import { Component } from "react";

class Hello extends Component {
  /*
    static 키워드를 이용하여, props 기본 값 객체를 컴포넌트 내부에 설정할 수 있다.
    static defaultProps = {
      name: "Unknown"
    };

    - 클래스형 메서드에는 항상 render() 메서드가 있어야 한다.
    - 이 내부에서 리턴을 진행하면 된다.
  */
  render() {
    // props로 넘겨 준 값들 받기
    const { color, name, isSpecial } = this.props;
    return (
      <div style={{ color }}>
        {isSpecial && <b>*</b>}
        Hello World👋 {name}
      </div>
    );
  }
}

// props 기본 값 객체 : 기존대로 컴포넌트 바깥에다가 써주면 된다.
Hello.defaultProps = {
  name: "Unknown",
};

export default Hello;
