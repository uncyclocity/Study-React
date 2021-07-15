import { Home } from "./Home";
import { About } from "./About";

// 요청 주소에 따라 다른 컴포넌트 보여주기 - Route 컴포넌트
// 다른 컴포넌트로 넘어가는 링크 만들기 - Link 컴포넌트
import { Link, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <hr />
      {/* exact : 경로가 정확해야 표시되도록 설정(이를 생략 시 슬래시가 들어간 모든 경로에서 뜨게 됨) */}
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
