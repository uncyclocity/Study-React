import Hello from './Hello'
import './App.css'
import Wrapper from './Wrapper'

function App() {
  const name = 'react';
  
  // 인라인 스타일은 객체 형태로 작성한다
  // background-color와 같이 -로 구분된 이름들은 backgroundColor와 같은 camelCase 형태로 네이밍 해주어야 함
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 = px
    padding: '1rem' // 다른 단위를 사용하려면 문자열로 설정해주어야 한다.
  };

  return (
    // 태그의 이름이 없는 <></> 형태의 태그는 Fragment이며, 브라우저 상에서 별도의 엘리먼트로 나타나지 않는다
    // 컴포넌트 태그 사이에 값을 넣을 경우, 해당 컴포넌트의 props.childeren을 조회할 필요가 있다()
    <Wrapper>

      {/* JSX의 태그는 항상 닫아주어야 하며, </> <- 이런식으로 태그 하나로 요약 가능하다 */}
      {/* 컴포넌트에 어떠한 값을 전달할 때, props를 사용한다. 여러개를 전달 할 수 있다.*/}
      {/* isSpecial={true}는 isSpecial과 같다 */}
      <Hello name="react" color="blue" isSpecial/>
      <Hello color="skyblue"/>

      {/* 컴포넌트는 여러 번 재사용이 가능하다 */}
      {/* <Hello />
          <Hello />
          <Hello /> */}

      {/* JSX 내에 JS 변수를 보일 떄는 {}로 감싼다 */}
      <div style={style}>{name}</div>

      {/* CSS class 설정 시, 'class='가 아닌 'className='으로 설정해주어야 함 */}
      <div className="grey-box"></div>

      <div
      // 열리는 태그 내부에서는 이렇게 주석 작성이 가능함
      />

    </Wrapper>
  );
}

export default App;
