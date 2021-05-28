import React from 'react';
// import {useEffect} from 'react';
/* useEffect는 재학습 필요 있음
https://simsimjae.tistory.com/401 */

// Array.prototype.map() 을 통해 호출되는 함수
const User = React.memo(function User({user, onRemove, onToggle}) {
    return(
        // jsx 외부에서 정의 된 event handler/callback은 파라미터를 넘겨줄 시 화살표 함수를 사용하여야 한다.
        <div>
            <b style={{
                cursor: 'pointer',
                color: user.active ? 'green' : 'black'
            }}
            onClick = {() => onToggle(user.id)}>{user.username}</b>
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    )
});

function UserList({users, onRemove, onToggle}) {
    // 렌더링 확인용
    console.log('UserList.js가 렌더링됨')
    return (
        <div>
            {/* Array.prototype.map() : 배열 내의 모든 요소에 대해 함수를 호출한 결과를 모아 새로운 배열을 만듦*/}
            {/* key를 지정하면 효율적인 업데이트 방식을 영위하므로 되도록이면 꼭 지정하는 것이 좋다 */}
            {/* id값이 없다면 index값을 key로 지정하면 된다 */}
            {/* {users.map((user,index) => (
                <User user={user} key={index} />
            ))} */}
            {users.map(user => (
                <User
                    user={user}
                    key={user.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
}

export default React.memo(UserList);