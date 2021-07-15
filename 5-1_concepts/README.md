# 챕터 5-01 : 프로젝트 준비 및 기본적인 사용법

> 참고 <br> https://react.vlpt.us/react-router/01-concepts.html <br> https://react.vlpt.us/react-router/

#### 📕 주로 배운 내용

- react-router 기본 개념

  - **라우팅** : SPA에서 주소에 따라 다른 뷰를 보여주는 것
  - 리액트 자체에는 라우팅 기능이 내장되어 있지 않으므로, 별도의 라이브러리를 사용해야 한다.
  - react-router는 가장 많이 쓰이는 라우팅 라이브러리이다.

- 간단 사용법

  - 서드파티 라이브러리이므로 설치해준다.

    ```
    $ yarn add react-router-dom
    ```

  - 라우터 적용 컴포넌트 `BrowserRouter`를 `index.js`에 import하여 적용해준다.

    ```
    import { BrowserRouter } from "react-router-dom";
    ```

    ```
    ReactDOM.render (
      <BrowserRouter>
        <App />
      </BrowserRouter>
      document.getElementById("root")
    )
    ```

  - 경로에 따른 뷰 표시는 `Route` 컴포넌트를 이용한다.

    - `exact` : path가 정확해야만 해당 뷰가 표시되도록 하는 여부

    ```
    import { Route } from "react-router-dom";
    ```

    ```
    // exact=F일 경우, 슬래시가 포함된 "/about" 경로에서도 Home 컴포넌트가 표시된다.
    <Route path="/" exact={true} component={Home} />
    <Route path="/about" component={Home} />
    ```

  - 다른 경로로 넘어가는 링크를 만드려면 `Link` 컴포넌트를 이용한다.

    - a 태그를 사용하지 않는다.

    ```
    import { Link } from "react-router-dom";
    ```

    ```
    <Link to="/">메인 페이지</Link>
    <Link to="/about">소개 페이지</Link>
    ```
