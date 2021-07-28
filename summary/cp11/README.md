# 11. useEffect 알아보기

> _References_ <br> https://react.vlpt.us/basic/16-useEffect.html <br> https://xiubindev.tistory.com/100

## 📕 주로 배운 내용

- ### `useEffect()`
  - **렌더링** 및 **deps 배열 내부 값의 상태 변경**이 일어나면 지정된 작업을 수행하는 Hook
  - **마운트(=렌터링) 직후/언마운트(=컴포넌트 사라짐) 직전/deps 내부 값 변경 직전/deps 내부 값 변경 직후** 중 원하는 시점에서 특정 작업을 처리할 수 있다.

<br>

- ### `useEffect` 함수의 구조

  ```javascript
  useEffect(function[, deps])
  ```

  - **`function`** : 실행시키려는 콜백 함수
  - **`deps`** : 상태 변경을 감지하고자 하는 값이 들어가는 의존성 배열

<br>

- ### 파라미터 조합에 따른 작업 실행 시점

  - `useEffect(콜백함수)` ➡ 마운트

    ```javascript
    useEffect(() => {
      console.log("마운트 발생");
    });
    ```

  - `useEffect(콜백함수, 빈 deps 배열)` ➡ 최초 마운트

    ```javascript
    useEffect(() => {
      console.log("최초 마운트 발생");
    }, []);
    ```

  - `(콜백함수, 값이 들어간 deps 배열)` ➡ 최초 마운트, 상태 업데이트

    ```javascript
    const [item, setItem] = useState(0);

    useEffect(() => {
      console.log("최초 마운트 OR 상태 업데이트");
    }, [item]);

    setItem(item + 1);
    ```

    **콘솔 출력 결과**

    ```bash
    최초 마운트 OR 상태 업데이트
    최초 마운트 OR 상태 업데이트
    ```

  - ### 최초 마운트 스킵, 상태 업데이트 시에만 작업 수행 <br> (useRef 변수를 활용한 조건문 삽입 활용)

    ```javascript
    const [item, setItem] = useState(1);

    // 최초 마운트 시 true로 바꾸어 줄 변수
    const isMounted = useRef(false);

    useEffect(() => {
      if (!isMounted.current) {
        // 최초 마운트 시 오는 곳
        isMounted.current = true;
      } else {
        // deps 상태 변경 시 오는 곳
        console.log("상태 업데이트");
      }
    }, [item]);

    // 상태 변경
    setItem(item + 1);
    ```

    **콘솔 출력 결과**

    ```bash
    상태 업데이트
    ```

<br>

- ### 언마운트 OR deps 상태 변경 시 「cleanup 함수」 반환

  ```javascript
  const [item, setItem] = useState(1);

  useEffect(() => {
    console.log("최초 마운트 OR 상태 업데이트");

    // cleanup 함수
    return () => {
      console.log("언마운트 OR 상태 업데이트 직전");
    };
  }, [item]);

  // 상태 변경으로 cleanup 함수가 리턴됨
  setItem(item + 1);
  ```

  **콘솔 출력 결과**

  ```bash
  최초 마운트 OR 상태 업데이트
  언마운트 OR 상태 업데이트 직전
  최초 마운트 OR 상태 업데이트
  ```
