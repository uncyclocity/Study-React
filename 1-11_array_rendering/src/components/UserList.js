function User ({user}) {
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
}

function UserList () {
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

    return (
        <div>
            {users.map(user => (
               <User user={user} key={user.id} />
            ))}
        </div>
    );
}

export default UserList;