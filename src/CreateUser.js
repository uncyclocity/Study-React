function CreateUser({onChange, onCreate, username, email}) {
    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                vlaue={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default CreateUser;