# 챕터 4-1 : API 연동의 기본

> 참고 <br> https://react.vlpt.us/integrate-api/01-basic.html <br> https://velog.io/@shin6403/React-axios%EB%9E%80-feat.-Fetch-API

#### 📕 주로 배운 내용

- axios

  - **Promise API**가 기반인 HTTP 비동기 통신 클라이언트이다.
  - GET/POST/PUT/DELETE 등의 HTTP 메소드를 통해 CRUD가 가능하다.
  - `async`와 `await`를 활용하면 콜백 지옥을 벗어날 수 있다.

<br>

- 사용하기

  - 외부 라이브러리이기에 설치한 뒤 import 해준다.

    ```
    $ yarn add axios
    ```

    ```
    import axios from "axios";
    ```

  - `get` : 파라미터로 넘겨받은 URL에서 데이터를 받아온다.

    ```
    axios.get(url)
    ```

  - `post` : 새 데이터를 등록한다.

    ```
    axios.post(url[, data]);
    ```

> ⚒ 작업중 ⚒
