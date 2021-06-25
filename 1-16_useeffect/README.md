# 챕터 1-16 : useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기

> 참고 <br> https://react.vlpt.us/basic/16-useEffect.html <br> https://xiubindev.tistory.com/100

#### 📕 주로 배운 내용

- useEffect() 기본 개념
  - 컴포넌트가 렌더링을 감지하여 특정 작업을 실행하도록 하는 Hook
  - **마운트(렌터링)/언마운트(사라짐)/deps 상태 업데이트 직전** 중 원하는 시점에서 특정 작업을 처리할 수 있다.
  - 클래스형 컴포넌트의 생명주기 메서드와 흡사하다.

<br>

- 함수의 형태 : `useEffect(function, deps)`
  - `function` : 수행시키려는 작업
  - `deps` : 상태 변경을 검사하고자 하는 특정 값들이 들어가는 배열

<br>

- `useEffect` 함수 파라미터 조합에 따른 실행 시점

  - `(함수)` -> 마운트

    ```{.javascript}
    useEffect(() => {
      console.log('마운트 발생');
    });
    ```

  - `(함수, 빈 배열)` -> 최초 마운트

    ```{.javascript}
    useEffect(() => {
      console.log('최초 마운트 발생');
    }, []);
    ```

  - `(함수, 값이 들어간 배열)` -> 최초 마운트, 상태 업데이트

    ```{.javascript}
    const [item, setItem] = useState(0);

    useEffect(() => {
      console.log('최초 마운트 OR 상태 업데이트');
    }, [item]);

    setItem(item + 1);
    ```

    **result**

    ```
    최초 마운트 OR 상태 업데이트
    최초 마운트 OR 상태 업데이트
    ```

  - [번외] 최초 마운트 스킵, 상태 업데이트 시에만 작업 수행 : useRef 변수를 활용한 조건문 삽입

    ```{.javascript}
    const [item, setItem] = useState(1);

    // 최초 마운트 시 true로 바꾸어 줄 변수
    const isMounted = useRef(false);

    useEffect(() => {
      if (!isMounted.current) {
        // 최초 마운트 시 오는 곳
        isMounted.current = true;
      } else {
        // deps 상태 변경 시 오는 곳
        console.log('상태 업데이트');
      }
    }, [item]);

    setItem(item + 1);
    ```

    **result**

    ```
    상태 업데이트
    ```

<br>

- cleanup 함수 반환 (return 뒤에 나오는 함수)

  - 호출 시점 : 언마운트, 상태 업데이트 직전

    ```{.javascript}
    const [item, setItem] = useState(1);

    useEffect(() => {
      console.log('최초 마운트 OR 상태 업데이트');

      // cleanup 함수
      return () => {
        console.log('언마운트 OR 상태 업데이트 직전');
      };
    }, [item]);

    setItem(item + 1);
    ```

    **result**

    ```
    최초 마운트 OR 상태 업데이트
    언마운트 OR 상태 업데이트 직전
    최초 마운트 OR 상태 업데이트
    ```
