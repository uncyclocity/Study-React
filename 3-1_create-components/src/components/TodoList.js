import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  return (
    <TodoListBlock>
      <TodoItem done={true} text="프로젝트 생성하기" />
      <TodoItem done={true} text="컴포넌트 스타일링 하기" />
      <TodoItem done={false} text="context 만들기" />
      <TodoItem done={false} text="기능 구현하기" />
    </TodoListBlock>
  );
}

export default TodoList;
