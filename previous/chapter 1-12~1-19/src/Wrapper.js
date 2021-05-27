function Wrapper({ children }) {
    const style = {
        border: '2px solid black',
        padding: '16px'
    };

    return (
        // props.Children을 불러내어 Wrapper 컴포넌트 태그 안의 내용을 조회하였다.
        <div style={style}>
            {children}
        </div>
    )
}

export default Wrapper;