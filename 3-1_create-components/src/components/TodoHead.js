import styled from "styled-components";

const TodoHeadStyle = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    font-size: 21px;
    color: #868e96;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead() {
  const today = new Date();

  const year = today.getFullYear(),
    month = today.getMonth() + 1,
    date = today.getDate(),
    day = today.getDay();

  const dayArr = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  return (
    <TodoHeadStyle>
      <h1>
        {year}년 {month}월 {date}일
      </h1>
      <div className="day">{dayArr[day]}</div>
      <div className="tasks-left">할 일 n개 남음</div>
    </TodoHeadStyle>
  );
}

export default TodoHead;
