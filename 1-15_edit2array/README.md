# 챕터 1-15 : 배열에 항목 수정하기

> 참고 https://react.vlpt.us/basic/15-array-modify.html

#### 📕 주로 배운 내용

- **삼항 연산자**를 이용한 조건부 스타일링

```{.javascript}
  return (
    <div>
      <b
        style={{
        cursor: 'pointer',
        // user.active 값의 T/F 여부에 따라 글자색이 바뀜
        color: user.active ? 'green' : 'black'
        }}
      >
        {user.username}
      </b>
    </div>
  )
```

<br>

- `Array.prototype.map()`을 통한 상태 변경

```{.javascript}
  const onToggle = (id) => {
    setUsers(
        // 받아온 id 값과 매칭되면 active 값을 반전한 객체를 추가, 아니면 그냥 추가
        users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }
```
