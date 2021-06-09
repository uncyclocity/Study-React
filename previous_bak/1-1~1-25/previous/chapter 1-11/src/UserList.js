// Array.prototype.map() 을 통해 호출되는 함수
function User({user}) {
    return(
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    )
}

function UserList() {
    const users = [
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com'
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com'
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com'
        }
    ];

    return (
        <div>
            {/* Array.prototype.map() : 각각의 요소를 순서대로 부름 (그리고 새로운 배열을 만듦)*/}
            {/* key를 지정하면 효율적인 업데이트 방식을 영위하므로 되도록이면 꼭 지정하는 것이 좋다 */}
            {/* id값이 없다면 index값을 key로 지정하면 된다 */}
            {/* {users.map((user,index) => (
                <User user={user} key={index} />
            ))} */}
            {users.map(user => (
                <User user={user} key={user.id}/>
            ))}
        </div>
    );
}

export default UserList;