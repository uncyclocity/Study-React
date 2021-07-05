import { useState, useContext, useRef } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { darken, lighten } from "polished";
import { UserDispatch } from "../App";

const CircleButton = styled.div`
  background: #38d9a9;
  &:hover {
    background: ${lighten(0.1, "#38d9a9")};
  }
  &:active {
    background: ${darken(0.1, "#38d9a9")};
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  font-size: 60px;
  position: absolute;
  left: 88%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 8px 0 #38d9a9;

  transition: 0.15s all ease-in-out;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      box-shadow: 0 0 8px 0 #ff6b6b;
      &:hover {
        background: ${lighten(0.1, "#ff6b6b")};
      }
      &:active {
        background: ${lighten(0.1, "#ff6b6b")};
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);
  const dispatch = useContext(UserDispatch);
  const textInput = useRef();

  const onToggle = () => setOpen(!open);

  const onCreate = () => {
    if(open && window.event.keyCode === 13) {
      const inputed = textInput.current.value;

      dispatch({
        type: "CREATE_TODO",
        inputed
      });

      onToggle();
    }
  }

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm>
            <Input onKeyup={onCreate} autofocus placeholder="할 일을 입력 후, Enter을 누르세요" ref={}/>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default TodoCreate;
