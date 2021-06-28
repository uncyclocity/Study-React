# 챕터 1-14 : 배열에 항목 제거하기

> 참고 https://react.vlpt.us/basic/14-array-remove.html

#### 📕 주로 배운 내용

- JSX 내부에서 외부의 함수에 특정 값을 인자로 넘기려면, **콜백 함수 내부**에서 해당 함수를 호출하여야 한다.
- `onClick={onRemove(user.id)}` 형태로 넘겨 줄 경우 오류가 발생한다. (<a href="https://github.com/uncyclocity/study_react/tree/main/1-07_usestate">챕터 1-7 참고</a>)

  ```
    function User({ user, onRemove }) {
      return (
        <div>
          <b>{user.username}</b> <span>({user.email})</span>
          {/* user.id값을 onRemove 함수에 넘기기 */}
          <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
      )
    }
  ```

<br>

- 배열 항목 제거하기 : **지정한 조건에 해당하지 않는 요소만 추려 새 배열을 반환하는 `filter()` 배열함수**를 이용할 수 있다.<br>

```
  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id));
  }
```
