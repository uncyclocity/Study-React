# 챕터 1-5 : props를 통해 컴포넌트에게 값 전달하기

> 참고 : https://react.vlpt.us/basic/05-props.html

#### 📕 주로 배운 내용

- props 기본 규칙

  - props를 통해 특정 값이나 스타일을 전달하여 지정할 수 있다.
  - props는 개수 제한이 없으며, props 각 값들이 들어간 객체로 전달이 된다.

  ##### App.js

  ```{.javascript}
  import Hello from './components/Hello';

  function App() {
    return <Hello name="uncyclocity" color="pink">
  }
  ```

  ##### Hello.js

  ```{.javascript}
  function Hello(props) {
    return <div style={{ color = props.color }}>저는 { props.name } 입니다.</div>
  }

  export default Hello;
  ```

  <br>

- 비구조화 할당 활용

  ##### Hello.js

  ```{.javascript}
  function Hello({ name, color }) {
    return <div style={{ color }}>저는 { name } 입니다.</div>
  }

  export default Hello;
  ```

  <br>

- `defaultProps` 객체를 이용한 props 기본 값 설정

  ##### Hello.js

  ```{.javascript}
  function Hello({ name, color }) {
    return <div style={{ color }}>저는 { name } 입니다.</div>
  }

  Hello.defaultProps = {
      name: "Unkonwn",
      color: "red"
  }

  export default Hello;
  ```

  <br>

- `props.children` - 컴포넌트 열림/닫힘 태그 사이의 내용을 가리키는 props

  ##### App.js

  ```{.javascript}
  import Hello from './components/Hello';
  import Wrapper from './components/Wrapper';

  function App() {
    return (
      <Wrapper
      // children 내용을 감싸는 박스 역할
      >
        <Hello name="Uncyclocity" color="pink" />
      <Wrapper />
    )
  }
  ```

  ##### Hello.js

  ```{.javascript}
  function Hello({ name, color }) {
    return <div style={{ color }}>저는 { name } 입니다.</div>
  }

  export default Hello;
  ```

  ##### Wrapper.js

  ```{.javascript}
  function Wrapper({children}) {
    // 인라인 스타일에 필요한 스타일링 객체 생성
    const style = {
      border: "2px solid pink",
      padding: "16px",
    };

    return ({
      <div style={style}>
        {/* 결과적으로 Hello 컴포넌트의 내용이 이 안에 들어간다 */}
        {children}
      </div>
    })
  }

  export default Hello;
  ```
