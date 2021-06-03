import "./Button.scss";
import classNames from "classnames";

function Button({ children, size, color }) {
  // classNames 패키지 사용/미사용을 비교해보자
  // return <button className={["Button", size].join(" ")}>{children}</button>;
  // return <button className={`Button ${size}`};
  return (
    <button className={classNames("Button", size, color)}>{children}</button>
  );
}

// props의 default 값을 정의함
Button.defaultProps = {
  size: "medium",
  color: "blue",
};

export default Button;
