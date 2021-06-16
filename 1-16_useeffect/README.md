# 챕터 1-16 : useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기

> 참고 <br> https://react.vlpt.us/basic/15-array-modify.html <br> https://xiubindev.tistory.com/100

#### 📕 주로 배운 내용

- useEffect() 기본 개념
  - 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 Hook
  - 마운트/언마운트/업데이트 중 원하는 시점에서 특정 작업을 처리할 수 있도록 한다.
  - 이전에 클래스형 컴포넌트에서 사용하던 <u>생명주기 메서드</u>를 함수형 컴포넌트에서 사용하는 것과 같다.
  - `useEffect(함수, [deps])` 형태로 사용가능하다. deps 배열에 값을 넣을 경우 상태가 변경 될 때마다 함수가 실행된다.

<br>

- 함수의 형태 : `useEffect(function, [deps])`
  - function : 수행하도록 하려는 작업이다.
  - [deps] : 상태 변경을 검사하고자 하는 특정 값을 넣는 배열이며, 빈 배열이 들어가거나 빈 공간으로 둘 수 있다.

<br>

- 함수의 구성 요소에 따른 동작 방식

  - 처음 랜더링 될 때만 실행하기 : 함수와 빈 배열을 넘긴다.

  ```{.javascript}
  useEffect(() => {
      console.log('처음 렌더링 될 때만 실행된다.');
  }, []);
  ```

  - 랜더링 될 때마다 실행하기 : deps 없이 함수만 넘긴다.

  ```{.javascript}
  useEffect(() => {
      console.log('렌더링 될 때마다 실행된다.');
  });
  ```

  - 처음 렌더링 및 deps 상태가 설정 될 때 실행하기 : 함수와 값이 들어간 배열을 넘긴다.

  ```{.javascript}
  const [item, setItem] = useState(1);

  useEffect(() => {
      console.log('첫 랜더링 및 deps 상태가 변경될 때 실행된다.');
  }, [item]);
  ```

  - (번외) deps 상태가 변경 될 때만 실행하기 : useRef 변수를 통해 함수에 조건을 부여한다.

  ```{.javascript}
  const [item, setItem] = useState(1);

  const isMounted = useRef(false); // 처음 렌더링 시 true로 바꾸어 줄 변수

  useEffect(() => {
    if (!isMounted.current) {
      // 처음 렌더링 시 isMounted 변수를 true로 바꾸어 주는 작업만 한다.
      isMounted.current = true;
    } else {
      console.log('deps 상태가 변경될 때만 실행된다.');
    }
  }, [item]);
  ```

<br>

- cleanup 함수 사용하기

  - 컴포넌트가 화면에서 사라지거나 deps 상태가 변경되기 직전에 반환되는 함수이다.

  ```{.javascript}
  const [item, setItem] = useState(1);

  useEffect(() => {
    console.log('첫 랜더링 및 deps 상태가 변경될 때 실행된다.');
    console.log(item);
    return () => {
      console.log('deps 상태가 바뀌기 직전이나, 컴포넌트가 반환될 때 실행된다.');
      console.log(item);
    };
  }, [item]);
  ```
