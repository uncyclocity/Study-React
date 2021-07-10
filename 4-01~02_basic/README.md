# 챕터 4-01 & 4-02

## API 연동의 기본

> 참고 <br> https://react.vlpt.us/integrate-api/01-basic.html <br> https://velog.io/@zofqofhtltm8015/Axios-사용법-서버-통신-해보기 <br> https://이듬.run/axios/guide/ <br> https://satisfactoryplace.tistory.com/84 <br> https://axios-http.com/

#### 📕 주로 배운 내용

- Axios 라이브러리

  - **Promise API**가 기반인 HTTP 비동기 통신 클라이언트이다.
  - 리액트에서 AJAX를 구현할 때도 사용된다.
  - GET/POST/PUT/DELETE 등의 **HTTP 메소드**를 통해 CRUD가 가능하다.
  - `async`와 `await`을 이용하여 콜백을 사용하지 않고도 비동기 흐름 제어가 가능하다.<br>
    👉 이를 통해 콜백 지옥 또한 방지할 수 있다.

    ##### Before

    ```
    axios.get("/users")
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      })
      .then(() => {
        console.log("실행이 완료되었습니다.");
      });
    ```

    ##### After

    ```
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/users");
        console.log(response);
      } catch (e) {
        console.log(e);
      }
      console.log("실행이 완료되었습니다.")
    }
    ```

<br>

- 시작하기

  - 외부 라이브러리이므로 설치한 뒤 import 해준다.

    ```
    $ yarn add axios
    ```

    ```
    import axios from "axios";
    ```

  - RESTful API 서버가 없을 경우, <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder</a>의 Fake API 서버를 사용할 수 있다.
    ```
    axios.get("https://jsonplaceholder.typicode.com/users");
    ```

<br>

- HTTP 메서드

  - `GET` : URL에서 데이터를 받아온다.

    ```
    axios.get(url)
    ```

    ##### 사용 예시

    ```
    const example = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        console.log("받아 온 데이터 : \n" + response.data);
      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => { example() }, []);
    ```

  - `POST` : URL의 데이터에 새 데이터를 등록한다.

    ```
    axios.post(url, data)
    ```

    ##### 사용 예시

    ```
    const example = async () => {
      const newData = {
        id: 11,
        name: "Guoi Paik",
        username: "Uncyclocity",
        address: "Seongnam"
      };
      console.log("넣은 데이터 : \n" + response.data);
      try {
        const response = await axios.post("https://jsonplaceholder.typicode.com/users", newData);
      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => example(), []);
    ```

  - `PUT` : URL의 데이터를 수정한다.

    ```
    axios.put(url, data)
    ```

  - `DELETE` : URL의 데이터 내용을 삭제한다.

    ```
    axios.delete(url);
    ```

  - `axios.all`을 통해 여러 개의 요청을 동시에 수행할 수 있다.

    ```
    const newData = {
      id : 11,
      name: "Guoi Paik",
      username: "Uncyclocity"
    };

    const example = async() => {
      function getData() {
        return axios.get("https://jsonplaceholder.typicode.com/users");
      }

      function postData() {
        return axios.post("https://jsonplaceholder.typicode.com/users", newData)
      }

      try {
        const response = axios.all([postData(), getData()]);
      } catch (e) {
        console.log(e)
      }
    };
    ```
