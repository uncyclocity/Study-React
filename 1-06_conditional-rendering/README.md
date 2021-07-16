# 1-6. 조건부 렌더링

> _References_ <br> https://react.vlpt.us/basic/06-conditional-rendering.html

## 📕 주로 배운 내용

- ### 조건부 렌더링

  - JSX 코드 내부에 **논리 연산자** 나 **삼항 연산자** 를 사용하면 조건에 따라 렌더링을 조작할 수 있다.

  - 논리 연산자 : `isTrue && true`

    ```javascript
    return (
      {isVip && <b>{name}님 께서는 현재 VIP 고객이십니다.</b>}
    );
    ```

  - 삼항 연산자 : `isTrue ? true : false`

    ```javascript
    return (
      {isVip ?
        <b>{name}님 께서는 현재 VIP 고객이십니다.</b> :
        <b>{name}님 께서는 현재 일반 고객이십니다.</b>
      }
    );
    ```

<br>

- ### `<Component isTrue={true} />` **=** `<Component isTrue />`

  - props의 값 세팅을 생략하면 `true`로 자동 셋팅된다.

    ```javascript
    // 둘 다 같은 코드다.
    return (
        {/* <Hello name="Uncyclocity" isVIP={true} /> */}
        <Hello name="Uncyclocity" isVIP />
      );
    }

    export default App;
    ```
