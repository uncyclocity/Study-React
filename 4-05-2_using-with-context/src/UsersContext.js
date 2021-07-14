import { createContext, useContext, useReducer } from "react";
import {
  createAsyncDispatcher,
  init_form,
  createAsyncHandler,
} from "./asyncActionUtils";
import * as api from "./api";

// asyncActionUtils/init_form을 각각 초기 상태로 설정해줌
const init = {
  users: init_form,
  user: init_form,
};

// API 처리를 수행하는 함수를 불러옴(각각 액션타입에 들어갈 문자열과 프로미스 함수를 넘겨주었음)
export const getUsers = createAsyncDispatcher("USERS", api.getUsers);
export const getUser = createAsyncDispatcher("USER", api.getUser);

// 리듀서 핸들러(액션타입 문자열 넘겨줌)
const usersHandler = createAsyncHandler("USERS");
const userHandler = createAsyncHandler("USER");

// reducer에서 users/user로 거름 -> 리듀서 핸들러에서 액션 타입에 따라 반환됨
function reducer(state, action) {
  switch (action.type) {
    case "SUCCESS_USERS":
    case "LOADING_USERS":
    case "ERROR_USERS":
      return usersHandler(state, action);
    case "SUCCESS_USER":
    case "LOADING_USER":
    case "ERROR_USER":
      return userHandler(state, action);
    default:
      throw new Error(`${action.type}은 명시되지 않은 타입입니다.`);
  }
}

// state, dispatch
export const UserState = createContext(null);
export const UserDispatch = createContext(null);

export default function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, init);

  return (
    <UserState.Provider value={state}>
      <UserDispatch.Provider value={dispatch}>{children}</UserDispatch.Provider>
    </UserState.Provider>
  );
}

// 커스텀 Hook 2형제
export function useUserState() {
  const state = useContext(UserState);
  if (!state) throw new Error("Provider를 찾을 수 없습니다.");
  return state;
}
export function useUserDispatch() {
  const dispatch = useContext(UserDispatch);
  if (!dispatch) throw new Error("Provider를 찾을 수 없습니다.");
  return dispatch;
}
