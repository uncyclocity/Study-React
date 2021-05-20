import Hello from './Hello'
// Hello 컴포넌트를 가져온다 (경로 지정)

import './App.css'
// css 파일을 가져온다 (경로 지정)

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
    <>
    
      {/* 컴포넌트는 여러 번 재사용이 가능하다. */}
      {/* JSX의 태그는 항상 닫아주어야 하며, </> <- 이런식으로 태그 하나로 요약 가능하다. */}
      <Hello />
      <Hello />
      <Hello />

      {/* JSX 내에 JS 변수를 보일 떄는 {}로 감싼다 */}
      <div style={style}>{name}</div>

      {/* CSS class 설정 시, 'class='가 아닌 'className='으로 설정해주어야 함 */}
      <div className="grey-box"></div>

      <div
      // 열리는 태그 내부에서는 이렇게 주석 작성이 가능함
      />

    </>
  );
}

export default App;
