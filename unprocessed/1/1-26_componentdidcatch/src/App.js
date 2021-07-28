import User from "./components/User";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const user = {
    id: 1,
    username: "uncyclocity",
  };

  /*
    user 객체가 User 컴포넌트에 전달 되지 않았으며,
    User 컴포넌트에 defaultProps 설정이 되어 있지도 않으므로
    에러발생 -> componentDidCatch() 생명주기 발생
  */
  return (
    <ErrorBoundary>
      {/* <User user={user} /> */}
      <User />
    </ErrorBoundary>
  );
}

export default App;
