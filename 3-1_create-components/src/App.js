import { createGlobalStyle } from "styled-components";
import { useReducer, createContext } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";

// 전역적으로 스타일 적용하기 : createGlobalStyle 활용
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

const initialState = {
  todos: [],
  notDone: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      return {
        ...state,
        todos: state.todos.concat(action.newtodo),
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => action.id !== todo.id),
      };
    case "CHECK_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, isDone: action.isDone } : todo
        ),
      };
    case "REFRESH_ISDONE":
      return {
        ...state,
        notDone: state.todos.filter((todo) => !todo.isDone).length,
      };
    default:
      return state;
  }
}

export const UserDispatch = createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserDispatch.Provider value={dispatch}>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead todosLen={state.todos.length} notDone={state.notDone} />
        <TodoList todos={state.todos} />
        <TodoCreate />
      </TodoTemplate>
    </UserDispatch.Provider>
  );
}

export default App;
