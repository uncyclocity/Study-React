import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const init_form = {
  data: null,
  loading: false,
  error: null,
};

const init = {
  users: init_form,
  user: init_form,
};

const loading_state = {
  ...init_form,
  loading: true,
};

const error_state = (error) => ({
  ...init_form,
  error,
});

const success_state = (data) => ({
  ...init_form,
  data,
});

function reducer(state, action) {
  switch (action.type) {
    case "SUCCESS_USERS":
      return {
        ...state,
        users: success_state(action.data),
      };
    case "LOADING_USERS":
      return {
        ...state,
        users: loading_state,
      };
    case "ERROR_USERS":
      return {
        ...state,
        users: error_state(action.error),
      };
    case "SUCCESS_USER":
      return {
        ...state,
        user: success_state(action.data),
      };
    case "LOADING_USER":
      return {
        ...state,
        user: loading_state,
      };
    case "ERROR_USER":
      return {
        ...state,
        user: error_state(action.error),
      };
    default:
      throw new Error(`${action.type}은 명시되지 않은 타입입니다.`);
  }
}

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

export async function getUsers(dispatch) {
  dispatch({ type: "LOADING_USERS" });
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({ type: "SUCCESS_USERS", data: response.data });
  } catch (error) {
    dispatch({ type: "ERROR_USERS", error });
  }
}

export async function getUser(dispatch, id) {
  dispatch({ type: "LOADING_USER" });
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    dispatch({ type: "SUCCESS_USER", data: response.data });
  } catch (error) {
    dispatch({ type: "ERROR_USER", error });
  }
}

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
