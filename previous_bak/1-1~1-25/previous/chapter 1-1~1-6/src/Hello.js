function Hello({color, name, isSpecial}) {
    // props를 매개 변수로 받아 사용할 수 있다.
    //(props) 형태로 받아오면 props.name 형식으로 사용할 수 있고,
    //({name}) 형태로 받아오면 name 형식으로 사용할 수 있다.
    return (
    <div style={{color}}>
        {/* 조건부 랜더링 : 특정 조건에 따라 다른 결과물 렌더링 */}
        {/* { isSpecial ? <b>*</b> : null } */}

        {/* 단축 평가 논리 계산법 */}
        { isSpecial && <b>*</b> }
        
        Hello World! {name}
    </div>
    );
    //return <div style={{color: props.name}}>Hello World! {props.name}</div>
}

Hello.defaultProps = {
    // defaultProps를 통해 props의 기본값을 설정할 수 있다.
    name: 'Unknown'
}

// Hello 컴포넌트를 내보내겠다는 의미
export default Hello;