function Hello({ name, color, isSpecial }) {
  return (
    <div style={{ color }}>
      저는 {name} 입니다.
      {isSpecial && <b> 🤴현재 VIP 회원입니다.</b>}
      {/*
        삼항 연산자 ver:
        {isSpecial ? <b> 현재 VIP 회원이십니다.</b> : null}
      */}
    </div>
  );
}

Hello.defaultProps = {
  name: "unknown",
};

export default Hello;
