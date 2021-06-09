import "./Button.scss";
import classNames from "classnames";

// props : 자식(I LOVE REFRIGERATOR), 크기, 색
function Button({ children, size, color, outline, fullWidth, ...rest }) {
  // classNames 패키지 사용/미사용을 비교해보자
  // return (
  //   <button className={["Button", size, color].join(" ")}>{children}</button>
  // );
  // return <button className={`Button ${size} ${color}`}>{children}</button>;
  return (
    // {outline} 형태로 객체 안에 집어넣으면 True 일 때만 반환함
    <button
      className={classNames("Button", size, color, { outline, fullWidth })}
      // rest operator를 사용하여 props를 제외한 값들을 rest라는 값에 모아주고, <button> 태그에 rest 안의 객체 내부의 값을 모두 설정함
      // 참고로 꼭 이름이 rest일 필요는 없다.
      {...rest}
    >
      {children}
    </button>
  );
}

// props의 default 값을 정의함
Button.defaultProps = {
  size: "medium",
  color: "blue",
};

export default Button;
