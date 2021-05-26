// import {useEffect} from 'react';

// Array.prototype.map() 을 통해 호출되는 함수
function User({user, onRemove, onToggle}) {
    // 마운트, 언마운트 시 특정 작업 처리
    // useEffect(함수, 의존값 배열)
    // 배열(deps)을 비우면 컴포넌트가 처음 나타날때만 함수가 호출됨
    // useEffect는 함수를 반환할 수 있으며(cleanup 함수), deps가 빌 때는 컴포넌트가 사라질 때 호출됨

    // useEffect(() => {
    //     console.log('컴포넌트가 화면에 나타났습니다');
    //     return () => {
    //         console.log("컴포넌트가 화면에서 사라졌습니다");
    //     };
    // }, []);

    // deps에 넣은 특정 값은 처음 마운트가 될 때도, 지정한 값이 바뀔때도 호출이 된다.
    // useEffect(() => {
    //     console.log('user 값이 설정됨');
    //     console.log(user);
    //     return () => {
    //         console.log('user가 바뀌기 전...');
    //         console.log(user);
    //     };
    // }, [user]);

    // deps를 생략 할 경우, 리렌더링 될 때마다 호출된다.
    // useEffect(() => {
    //     console.log(user);
    // });

    return(
        // jsx 외부에서 정의 된 event handler/callback은
        // 파라미터를 넘겨줄 시 화살표 함수를 사용하여야 한다.
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
}

function UserList({users, onRemove, onToggle}) {
    return (
        <div>
            {/* Array.prototype.map() : 각각의 요소를 순서대로 부름 (그리고 새로운 배열을 만듦)*/}
            {/* key를 지정하면 효율적인 업데이트 방식을 영위하므로 되도록이면 꼭 지정하는 것이 좋다 */}
            {/* id값이 없다면 index값을 key로 지정하면 된다 */}
            {/* {users.map((user,index) => (
                <User user={user} key={index} />
            ))} */}
            {users.map(user => (
                <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>
            ))}
        </div>
    );
}

export default UserList;