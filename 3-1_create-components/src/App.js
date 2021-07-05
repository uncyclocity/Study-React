import { createGlobalStyle } from "styled-components";
import { useReducer, createContext, useRef } from "react";
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
  todos: [
    {
      text: "미사강변도시 임장",
      isDone: true,
    },
    {
      text: "광교신도시 임장",
      isDone: true,
    },
    {
      text: "위례신도시 임장",
      isDone: false,
    },
  ],
  notDone: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      return {
        ...state,
        todos: state.todos.concat(action.newTodo),
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
        <TodoHead notDone={state.notDone} />
        <TodoList todos={state.todos} />
        <TodoCreate />
      </TodoTemplate>
    </UserDispatch.Provider>
  );
}

export default App;
