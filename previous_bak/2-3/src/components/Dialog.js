import { useState, useEffect } from "react";
// 여러줄의 css 코드를 조건부로 보여주고 싶으면 css를 import 할 필요가 있다.
// CSS keyframe을 통해 트랜지션 효과를 적용할 수 있다.
import styled, { keyframes, css } from "styled-components";
import Button from "./Button";

// 검은배경 on
const fadeIn = keyframes`
    from {
        opacity: 0
    }
    to {
        opacity: 1
    }
`;

// 검은배경 off
const fadeOut = keyframes`
    from {
        opacity: 1
    }
    to {
        opacity: 0
    }
`;

// 위로 슬라이드
const slideUp = keyframes`
    from {
        transform: translateY(200px);
    }
    to {
        transform: translateY(0px);
    }
`;

// 아래로 슬라이드
const slideDown = keyframes`
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(200px);
    }
`;

// 검은배경 관련, 애니메이션 관련 코드
// onClick시에는 visible이 true이므로 fadeOut으로 바뀌지 않고, onConfirm/onCancel 시에는 visible이 false이므로 fadeOut으로 바뀜
const DarkBackground = styled.div`
    position: fixed;
    left: 0;
    top 0;
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

    ${(props) =>
      props.disappear &&
      css`
        animation-name: ${fadeOut};
      `}
`;

// SASS처럼 styled-components에서도 nested CSS 문법이 쌉가능이다.
// 다이얼로그 창, 애니메이션 관련 코드
// onClick시에는 visible이 true이므로 fadeOut으로 바뀌지 않고, onConfirm/onCancel 시에는 visible이 false이므로 fadeOut으로 바뀜
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

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
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
  visible
}) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(visible);

  // visible은 바뀌려는 상태, localVisible은 현재 상태
  // Animate 값 true -> 250ms 뒤에 false로 바꿈
  // 애니메이션이 한번 일어난 후, localVisible의 값이 visible이랑 같아지므로
  // 이후 한번 더 실행되더라도 setLocalVisible에서 같은 값으로 셋팅이 되므로 한번 더 실행되지 않는다.
  useEffect(() => {
    if (localVisible && !visible) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);
    }
    setLocalVisible(visible);
  }, [localVisible, visible]);

  // animate와 localVisible이 false이면 null을 반환함
  if (!animate && !localVisible) return null;

  return (
    <DarkBackground disappear={!visible}>
      <DialogBlock disappear={!visible}>
        <h3>{title}</h3>
        <p>{children}</p>
        <ButtonGroup>
          <ShortMarginButton color="gray" onClick={onCancel}>
            {cancelText}
          </ShortMarginButton>
          <ShortMarginButton color="pink" onClick={onConfirm}>
            {confirmText}
          </ShortMarginButton>
        </ButtonGroup>
      </DialogBlock>
    </DarkBackground>
  );
}

Dialog.defaultProps = {
  confirmText: "확인",
  cancelText: "취소"
};

export default Dialog;
