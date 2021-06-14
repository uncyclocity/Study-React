/*
  별도로 화면에 띄울 JSX 코드가 들어있는 함수형 컴포넌트를 만들었음
  - user 배열 인자의 username 요소와 email 요소를 띄운다.
*/
function User ({user}) {
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
}

function UserList () {
    /*
      렌더링 할 배열
      - key 값으로 쓸 id 값이 있다.
    */
    const users = [
        {
            id: 1,
            username: 'Uncyclocity',
            email: 'seongbeom_lee@kakao.com'
        },
        {
            id: 2,
            username: 'yoong_kim',
            email: 'dl2qja@gmail.com'
        },
        {
            id: 3,
            username: 'sblee',
            email: 'xuct227@gmail.com'
        }
    ];

    /*
      Array.prototype.map() : 배열의 각 요소에 대해 주어진 함수를 호출하여 얻은 결과들로 새로운 배열을 반환한다.
      - user은 배열의 각 요소를 담은 변수이며, 순차적으로 함수를 실행한 결과가 새로 반환 될 배열에 추가된다.
      - 아래의 결과의 경우, <User user={user} key={user.id} />가 3개 반환되어 화면에 표시된다.

      각 props에 대한 설명
      - user={user} : user 속성에 각 배열의 요소인 객체를 넣음으로써, 객체의 요소를 띄우는 데 사용됨
      - key={user.id} : 보다 효율적인 업데이트 방식을 위해 user의 "고유값"인 id를 key로 지정함
    */
    return (
        <div>
            {users.map(user => (
               <User user={user} key={user.id} />
            ))}
        </div>
    );
}

export default UserList;