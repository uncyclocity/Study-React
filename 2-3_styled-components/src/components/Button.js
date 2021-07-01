/*
  css
  - 여러 줄의 CSS 코드를 조건부로 보여줄 때 사용
  - 내부에서 부모의 props도 조회할 수 있다.
  - Tagged Tamplate Literal 문법을 사용
*/
import styled, { css } from "styled-components";

// polished : CSS in JS에서 유틸함수를 사용하기 위한 라이브러리
import { darken, lighten } from "polished";

const colorStyles = css`
  ${({ theme, color }) => {
    // ThemeProvider에서 지정한 전역 객체 theme 불러오기 : props.theme
    const selected = theme.palette[color];

    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${(props) =>
        props.outline &&
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

// 스타일링에 쓰일 값을 별도의 객체로 분리함
const sizes = {
  large: {
    height: "3rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    fontSize: "1.25rem",
  },
  medium: {
    height: "2.25rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    fontSize: "1rem",
  },
  small: {
    height: "1.75rem",
    paddingLeft: "0.875rem",
    paddingRight: "1rem",
    fontSize: "1rem",
  },
};
const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    padding-left: ${sizes[size].paddingLeft};
    padding-right: ${sizes[size].paddingRight};
    font-size: ${sizes[size].fontSize};
  `}
`;

const fullWidthStyles = css`
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;

const StyledButton = styled.button`
  display: table-cell;
  color: white;
  font-weight: bold;
  vertical-align: middle;
  outline: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  ${sizeStyles}

  ${colorStyles}

  ${fullWidthStyles}

  &:not(:first-child) {
    margin-left: 1rem;
    ${(props) =>
      props.fullWidth &&
      css`
        margin-left: 0;
        margin-top: 1rem;
      `}
  }
`;

function Button({ children, color, size, ...rest }) {
  return (
    <StyledButton color={color} size={size} {...rest}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: "blue",
  size: "medium",
};

export default Button;
