import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList({ todos }) {
  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem done={todo.isDone} text={todo.text} />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
