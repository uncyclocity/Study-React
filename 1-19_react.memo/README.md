# 챕터 1-19 : React.memo 를 사용한 컴포넌트 리렌더링 방지

> 참고 <br> https://react.vlpt.us/basic/19-React.memo.html <br> https://xiubindev.tistory.com/103 <br> https://ui.toast.com/weekly-pick/ko_20190731

#### 📕 주로 배운 내용

- `React.memo()` 기본 개념

  - props가 바뀌지 않은 함수형 컴포넌트의 **불필요한 리렌더링을 방지**하는 함수이다.
  - 컴포넌트 함수를 `React.memo()` 함수로 감싸서 사용한다.

    ```
    export default React.memo(Component01);
    ```

    ```
    // export 하지 않는 컴포넌트의 경우, 변수에 넣어줌으로써 감싸줄 수 있다.
    const Component02 = React.memo(function Component02(props) {
      ...
    });
    ```

  - 리렌더링의 기준이 되는 props 비교 방식을 바꾸고 싶을 경우, 두 번째 파라미터에 비교 함수를 넣어줄 수 있다.

    - 함수의 인자로 각각 기존과 다음의 컴포넌트 props가 들어간다.

      ```
      function compareFunc(prevProps, nextProps) {
        prevProps.items01 === nextProps.items01 &&
        prevProps.items02 === nextProps.items02
      }
      ...
      export default React.memo(Component01, compareFunc);
      ```

<br>

- (번외)함수형 업데이트를 통한 불필요한 렌더링 방지

  - `deps` 배열 안의 값이 바뀌면, 해당 값을 참조하고 있는 함수들이 재생성된다.<br>
    -> 그렇게 되면 해당 함수를 props로 넘겨받는 컴포넌트들은 리렌더링이 진행된다.

  - 함수형 업데이트는 값을 `deps`에 넣지 않고, 상태의 setter 함수 내부의 콜백 함수 파라미터에 값을 넘긴다.<br>
    **👉 다른 부분에서 값이 업데이트 되더라도 해당 함수가 재생성 되지 않으면서도 실행 시 최신 값을 참조할 수 있다.**

    ##### Before

    ```
    const [items, setItems] = useState([ 0, 1 ]);
    ...
    const Example = useCallback(() => {
      const item = 2;
      setUsers(items.concat(item));
    }, [items]);
    ```

    ##### After

    ```
    const [items, setItems] = useState([ 0, 1 ]);
    ...
    const Example = useCallback(() => {
      const item = 2;
      setUsers((items) => items.concat(item));
    }, []);
    ```
