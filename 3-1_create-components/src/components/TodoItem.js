import { useContext } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import { UserDispatch } from "../App";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  transition: 0.15s all ease-in-out;
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-itmes: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({ id, done, text }) {
  const dispatch = useContext(UserDispatch);

  const onRemove = () => {
    dispatch({
      type: "REMOVE_TODO",
      id
    });
    
    onRefreshNum();
  };

  const onCheck = () => {
    dispatch({
      type: "CHECK_TODO",
      id,
      isDone: !done
    });

    onRefreshNum();
  };

  const onRefreshNum = () => {
    dispatch({type: "REFRESH_ISDONE"});
  }

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onCheck}>{done && <MdDone />}</CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
