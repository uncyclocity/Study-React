function Wrapper({ children }) {
  // 인라인 스타일에 필요한 스타일링 객체 생성
  const style = {
    border: "2px solid pink",
    padding: "16px",
  };

  // Wrapper 열림/닫힘 태그 안의 내용을 감싸겠다.
  return <div style={style}>{children}</div>;
}

export default Wrapper;
