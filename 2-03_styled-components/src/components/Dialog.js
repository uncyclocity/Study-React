import Button from "./Button";

// 애니메이션을 사용하려면 keyframes를 가져온다.
import styled, { css, keyframes } from "styled-components";

// 애니메이션 실행에 필요한 Hook
import { useEffect, useState } from "react";

// DarkBackground 컴포넌트에 적용되는 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0
  } to {
    opacity: 1
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1
  } to {
    opacity: 0
  }
`;

// DialogBlock 컴포넌트에 적용되는 애니메이션
const slideUp = keyframes`
  from {
    transform: translateY(200px);
  } to {
    transform: translateY(0px);
  }
`;
const slideDown = keyframes`
  from {
    transform: translateY(0px);
  } to {
    transform: translateY(200px);
  }
`;

// 검은 배경에 쓰일 스타일 및 애니메이션 ON/OFF 정의
const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${
    (props) =>
      props.disappear &&
      css`
        animation-name: ${fadeOut};
      `
    /* props로 받아 온 disappear이 true이면 종료 애니메이션으로 변경 */
  }
`;

// 다이얼로그 블록에 쓰일 스타일 및 애니메이션 ON/OFF 정의
const DialogBlock = styled.div`
  width: 320px;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    font-size: 1.125rem;
  }

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${
    (props) =>
      props.disappear &&
      css`
        animation-name: ${slideDown};
      `
    /* props로 받아 온 disappear이 true이면 종료 애니메이션으로 변경 */
  }
`;

const ButtonGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
`;

const ShortMarginButton = styled(Button)`
  &:not(:first-child) {
    margin-left: 0.5rem;
  }
`;

function Dialog({
  title,
  children,
  cancelText,
  confirmText,
  onConfirm,
  onCancel,
  visible,
}) {
  const [animate, setAnimate] = useState(false); // 애니메이션 실행 상태
  const [localVisible, setLocalVisible] = useState(visible); // 애니메이션 실행을 위해 실제 다이얼로그가 사라지는 시점을 연기함

  /*
    ※ 다이얼로그 열림, 닫힘 모두 해당된다.
    onClick 이벤트를 통한 visible 상태 반전
    -> 로컬 visible과 비교 후 다르면 애니메이션 실행 & 종료
    -> 로컬 visible의 상태를 반전
    -> animate, localVisible 모두 false이므로 null 반환(=다이얼로그가 사라짐)
  */
  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  // 애니메이션이 끝나고 컴포넌트 삭제를 알리는 값이 false가 되면 다이얼로그가 없어진다.
  if (!animate && !localVisible) return null;

  // visible의 반대 개념의 disappear을 넘겨 주어, true일 경우 종료 애니메이션으로 바꾸어줌
  return (
    <DarkBackground disappear={!visible}>
      <DialogBlock disappear={!visible}>
        <h3>{title}</h3>
        <p>{children}</p>
        <ButtonGroup>
          <ShortMarginButton color="gray" onClick={onConfirm}>
            {cancelText}
          </ShortMarginButton>
          <ShortMarginButton color="pink" onClick={onCancel}>
            {confirmText}
          </ShortMarginButton>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

Dialog.defaultProps = {
  confirmText: "확인",
  cancelText: "취소",
};

export default Dialog;
