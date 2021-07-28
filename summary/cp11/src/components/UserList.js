import { useEffect, useRef } from "react";

function User({ user, onRemove, activer }) {
  // useEffect(() => {
  //   console.log("처음 렌더링 될 때만 실행된다.");
  // }, []);

  // useEffect(() => {
  //   console.log("렌더링 될 때마다 실행된다.");
  // });

  // useEffect(() => {
  //   console.log("처음 렌더링 될 때랑 deps가 업데이트 될 때만 실행된다.");
  // }, [user]);

  // const isMounted = useRef(false);
  // useEffect(() => {
  //   if (!isMounted.current) {
  //     isMounted.current = true;
  //   } else {
  //     console.log("deps가 업데이트 될 때만 실행된다.");
  //     // 그 이유는 첫 렌더링 시 isMounted 변수를 true로 바꾸기 때문이다.
  //   }
  // }, [user]);

  // useEffect(() => {
  //   console.log("처음 렌더링 될 때만 실행된다.");
  //   console.log(user);
  //   return () => {
  //     // 언마운트될 때 반환하는 cleanup 함수이다.
  //     console.log("컴포넌트가 화면에서 사라질 때만 실행된다.");
  //     console.log(user);
  //   };
  // }, []);

  useEffect(() => {
    console.log("effect");
    console.log(user);
    return () => {
      // 언마운트될 때 반환하는 cleanup 함수이다.
      console.log(
        "컴포넌트가 화면에서 사라질 때랑 deps가 업데이트 될 때만 실행된다."
      );
      console.log(user);
    };
  }, [user]);

  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          // 삼항 연산을 이용한 조건부 스타일 렌더링
          color: user.active ? "green" : "black",
        }}
        onClick={() => activer(user.id)}
      >
        {user.username}
      </b>
      <span>({user.email})</span>
      {/* JSX 외부의 함수에 파라미터를 넘기려면 화살표 함수를 사용하여야 한다. */}
      <button onClick={() => onRemove(user.id)}>삭제하즈아</button>
    </div>
  );
}

function UserList({ users, onRemove, activer }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} onRemove={onRemove} activer={activer} />
      ))}
    </div>
  );
}

export default UserList;
