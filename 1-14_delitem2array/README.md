# 챕터 1-14 : 배열에 항목 제거하기

> 참고 https://react.vlpt.us/basic/14-array-remove.html

#### 📕 주로 배운 내용

- JSX 내부에서 외부의 함수에 특정 값을 파라미터를 넘기려면 **화살표 함수**가 필수

```{.javascript}
  function User({ user, onRemove }) {
    return (
      <div>
        <b>{user.username}</b> <span>({user.email})</span>
        {/* 현재 배열 요소인 객체의 id값을 onRemove 함수에 넘기기 */}
        <button onclick={() => onRemove(user.id)}>삭제</button>
      </div>
    )
  }
```

<br>

- 배열 항목 제거하기

```{.javascript}
  const onRemove = id => {
    // user.id가 파라미터로 받아온 id 값과 일치하지 않은 것만 추려서 새 배열을 만듬
    setUsers(users.filter(user => user.id !== id));
  }
```
