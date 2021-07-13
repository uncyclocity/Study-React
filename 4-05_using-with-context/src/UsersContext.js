import { createContext, useReducer, useContext } from "react";
import {
  createAsyncDispatcher,
  initialAsyncState,
  createAsyncHandler,
} from "./asyncActonUtils";
import * as api from "./api";

const initState = {
  users: initialAsyncState,
  user: initialAsyncState,
};

const usersHandler = createAsyncHandler("GET_USERS", "users");
const userHandler = createAsyncHandler("GET_USER", "user");

function usersReducer(state, action) {
  switch (action.type) {
    case "GET_USERS":
    case "GET_USERS_SUCCESS":
    case "GET_USERS_ERROR":
      return usersHandler(state, action);
    case "GET_USER":
    case "GET_USER_SUCCESS":
    case "GET_USER_ERROR":
      return userHandler(state, action);
    default:
      throw new Error(`${action.type}은 명시되지 않은 타입입니다.`);
  }
}

const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export default function UsersContext({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initState);

  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UsersStateContext);
  if (!state) throw new Error("UsersProvider를 찾을 수 없습니다.");
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) throw new Error("UsersProvider를 찾을 수 없습니다.");
  return dispatch;
}

export const getUsers = createAsyncDispatcher("GET_USERS", api.getUsers);
export const getUser = createAsyncDispatcher("GET_USER", api.getUser);
