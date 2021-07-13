import Users from "./Users";
import UsersContext from "./UsersContext";

function App() {
  return (
    <UsersContext>
      <Users />
    </UsersContext>
  );
}
export default App;
