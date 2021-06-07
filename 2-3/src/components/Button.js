import styled, { css } from "styled-components";
import { darken, lighten } from "polished";

const colorStyles = css`
  ${({ theme, color, outline }) => {
    // {theme, color} = props 이런 식의 비구조화 할당이다.
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

const fullWidthStyles = css`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      &:not(:first-child) {
        margin-left: 0;
        margin-top: 1rem;
      }
    `}
`;

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
