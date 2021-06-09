// 여러줄의 css 코드를 조건부로 보여주고 싶으면 css를 import 할 필요가 있다.
import styled, { css } from "styled-components";
// CSS in JS 코드에서 SCSS처럼 darken lighten 같은 스타일링 유틸 함수 사용
import { darken, lighten } from "polished";

// {theme, color, outline} = props 이런 식의 비구조화 할당이다.
const colorStyles = css`
  ${({ theme, color, outline }) => {
    // ThemeProvider 내부에 렌더링된 styled-components로 만든 컴포넌트에서 theme.palette[색상값이 들어간 인자] 형식으로 사용할 수 있다.
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${outline &&
      css`
        color: ${selected};
        background: none;
        border: 1px solid ${selected};
        &:hover {
          background: ${selected};
          color: white;
        }
        &:active {
          background: ${darken(0.1, selected)};
        }
      `}
    `;
  }}
`;

// 사이즈에 따라 각 height, font-size, padding을 나눔
// 객체에 각 값을 넣어서, css 코드에서 불러옴
const sizeStyle = {
  big: {
    height: "3rem",
    fontSize: "1.25rem",
    padding: "0.9rem"
  },
  medium: {
    height: "2.25rem",
    fontSize: "1rem",
    padding: "0.6rem"
  },
  small: {
    height: "1.75rem",
    fontSize: "0.875rem",
    padding: "0.4rem"
  }
};
const sizeStyles = css`
  ${({ size }) =>
    css`
      height: ${sizeStyle[size].height};
      font-size: ${sizeStyle[size].fontSize};
      padding: ${sizeStyle[size].padding};
    `}
`;
// 리펙토링 이전
// const sizeStyles = css`
//   ${({ size }) =>
//     size === "big" &&
//     css`
//       height: 3rem;
//       font-size: 1.25rem;
//       padding: 0.9rem;
//     `}

//   ${({ size }) =>
//     size === "medium" &&
//     css`
//       height: 2.25rem;
//       font-size: 1rem;
//       padding: 0.6rem;
//     `}

//   ${({ size }) =>
//     size === "small" &&
//     css`
//       height: 1.75rem;
//       font-size: 0.875rem;
//       padding: 0.4rem;
//     `}
// `;

// 가로로 꽉찬 버튼 스타일링
// &:not(:first-child) 선택자는 첫 자손을 거르고 적용한다.
// & + & 선택자를 사용해도 되었으나, 현재는 무슨 일인지 모든 해당 컴포넌트에 적용된다.
const fullWidthStyles = css`
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      &:not(:first-child) {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

// 버튼 스타일링 메인
const StyledButton = styled.button`
  display: inline-flex;
  color: white;
  font-weight: bold;
  outline: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  ${sizeStyles}

  ${colorStyles};

  &:not(:first-child) {
    margin-left: 1rem;
  }

  ${fullWidthStyles}
`;

function Button({ children, color, size, outline, fullWidth, ...rest }) {
  return (
    <StyledButton
      color={color}
      size={size}
      outline={outline}
      fullWidth={fullWidth}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: "blue",
  size: "medium"
};

export default Button;
