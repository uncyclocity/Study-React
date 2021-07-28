import UserProvider from "./UsersContext";
import Users from "./Users";

function App() {
  return (
    <UserProvider>
      <Users />
    </UserProvider>
  );
}

export default App;
