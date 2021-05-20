function Hello({color, name}) {
    // props를 매개 변수로 받아 사용할 수 있다.
    //(props) 형태로 받아오면 props.name 형식으로 사용할 수 있고,
    //({name}) 형태로 받아오면 name 형식으로 사용할 수 있다.
    return <div style={{color}}>Hello World! {name}</div>
    //return <div style={{color: props.name}}>Hello World! {props.name}</div>
}

Hello.defaultProps = {
    // defaultProps를 통해 props의 기본값을 설정할 수 있다.
    name: 'Unknown'
}

// Hello 컴포넌트를 내보내겠다는 의미
export default Hello;