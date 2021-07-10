import "./Button.scss";

// classnames 라이브러리를 import
import classNames from "classnames";

// rest 연산자 : 비구조화 할당 문법에서, 직접 명시한 props 요소 외의 것들을 가져올 때 사용
function Button({ children, size, color, outline, fullwidth, ...rest }) {
  /*
    Array.prototype.join() :
    배열 요소들을 하나의 문자열로 합친다. 인자로는 요소를 구분 할 문자열이 들어간다.
    return <button className={["Button", size].join(" ")}>{children}</button>;
  */

  /*
    백틱(`)을 활용하여 변수값을 포함한 문자열을 입력한다.
    return <button className={`Button ${size}`}>{children}</button>;
  */

  /*
    classnames 라이브러리
    - 조건부 스타일링 시, 보다 간편한 클래스 네이밍이 가능하다.
    - 중간크기 + 파란색 : className="Button medium blue"
    - outline 값이 true일 때만 적용 : { outline }
  */
  return (
    <button
      // class 구성요소 이외의, 이벤트 발생 속성같은 경우 rest 연산자를 통해 적용해 주었다.
      className={classNames("Button", size, color, { outline, fullwidth })}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: "medium",
  color: "blue",
};

export default Button;
