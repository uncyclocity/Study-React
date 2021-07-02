/*
  styled-components 기본 개념
  - JS 안에 CSS를 작성하는 CSS in JS 라이브러리 중 하나이다.
  - 원하는 스타일을 컴포넌트 형태로 사용할 수 있다.
  - 스타일링 코드 이외의 조건 로직이나 변수 등은 탬플릿 리터럴 문법인 ${...}를 사용한다.
  - 컴포넌트이므로 당연히 props를 넘길 수 있으며, 이를 받아서 조건부 스타일링에 필요한 값으로 사용할 수 있다.
  - 백틱(`)을 이용한 Tagged Tamplate Literal 문법을 사용한다.
*/

import { useState } from "react";
import Button from "./components/Button";
import Dialog from "./components/Dialog";

// ThemeProvider : 전역적으로 사용할 수 있는 값을 만들 수 있다.
import styled, { ThemeProvider } from "styled-components";

const AppBlock = styled.div`
  width: 512px;
  margin: 0 auto;
  margin-top: 4rem;
  border: 1px solid black;
  padding: 1rem;
`;

const ButtonGroup = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

function App() {
  const [dialog, setDialog] = useState(false);
  const onClick = () => {
    setDialog(true);
  };
  const onConfirm = () => {
    console.log("확인");
    setDialog(false);
  };
  const onCancel = () => {
    console.log("취소");
    setDialog(false);
  };

  return (
    // 전역적으로 사용 할 값을 지정한다. 이는 컴포넌트 내부에서 변수처럼 사용할 수 있다.
    <ThemeProvider
      theme={{
        palette: {
          blue: "#228be6",
          gray: "#495057",
          pink: "#f06595",
        },
      }}
    >
      <>
        <AppBlock>
          <ButtonGroup>
            <Button size="large">안녕하세요</Button>
            <Button>안녕하세요</Button>
            <Button size="small">안녕하세요</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="gray" size="large">
              안녕하세요
            </Button>
            <Button color="gray">안녕하세요</Button>
            <Button color="gray" size="small">
              안녕하세요
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button color="pink" size="large">
              안녕하세요
            </Button>
            <Button color="pink">안녕하세요</Button>
            <Button color="pink" size="small">
              안녕하세요
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="large" outline>
              안녕하세요
            </Button>
            <Button color="pink" outline>
              안녕하세요
            </Button>
            <Button color="gray" size="small" outline>
              안녕하세요
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button fullWidth>안녕하세요</Button>
            <Button color="pink" fullWidth>
              안녕하세요
            </Button>
            <Button color="gray" fullWidth onClick={onClick}>
              안녕하세요
            </Button>
          </ButtonGroup>
        </AppBlock>
        <Dialog
          title="날 어떻게 찾았지"
          confirmText="ㅇㅇ"
          cancelText="ㄴㄴ"
          onConfirm={onConfirm}
          onCancel={onCancel}
          visible={dialog}
        >
          데이터를 정말로다가 삭제하겠습니까
        </Dialog>
      </>
    </ThemeProvider>
  );
}

export default App;
