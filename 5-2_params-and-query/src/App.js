import Profile from "./Profile";
import About from "./About";
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* 파라미터 : 해당 컴포넌트에서 「props.match.params.username」으로 조회할 수 있다. */}
      <Route path="/profile/:username" component={Profile} />

      {/* 쿼리 : 해당 컴포넌트에서 「location.search」에 *문자열 형식으로* 들어가며, qs라이브러리를 통해 객체 형태로 변경할 수 있다. */}
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
