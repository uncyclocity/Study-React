# 챕터 1-6 : 조건부 렌더링

> 참고 : https://react.vlpt.us/basic/06-conditional-rendering.html

#### 📕 주로 배운 내용

- 조건부 렌더링

  - 삼항 연산자(`isTrue ? true : false`)나 논리 연산자(`isTrue && true`)를 통해 조건에 따라 렌더링을 조작할 수 있다.
  - 아래 코드와 같이 내용이 달라지는 것이 아닌 단순히 조건이 참이면 렌더링 요소를 추가하는 작업의 경우, 논리 연산자를 사용하는 것이 간편하다.

    ##### App.js

    ```
    import Hello from './components/Hello';

    function App() {
      return (
          <Hello name="Uncyclocity" isVIP={true} />
          <Hello name="yoongKim" />
      );
    }

    export default App;
    ```

    ##### Hello.js

    ```
    function Hello({ name, isVIP }}) {
      return (
        <div>저는 { name } 입니다.</div>
        {/*
          삼항 연산자 :
          isVIP ? <b>현재 VIP 고객입니다.</b> : null
        */}
        {isVIP && <b>현재 VIP 고객입니다.</b>}
      )
    }

    export default Hello;
    ```

  <br>

- `<Component isTrue={true} />` **=** `<Component isTrue />`

  - props의 값 셋팅을 생략할 경우, `true`로 자동 셋팅된다.

    ##### App.js

    ```
    import Hello from './components/Hello';

    function App() {
      return (
          {/* <Hello name="Uncyclocity" isVIP={true} /> */}
          <Hello name="Uncyclocity" isVIP />
          <Hello name="yoongKim"/>
      );
    }

    export default App;
    ```
