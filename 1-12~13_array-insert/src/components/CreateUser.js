function CreateUser({ username, email, onChange, onCreate, onInit }) {
  return (
    <div>
      <input
        onChange={onChange}
        name="username"
        placeholder="유저네임"
        value={username}
      />
      <input
        onChange={onChange}
        name="email"
        placeholder="이메일"
        value={email}
      />
      <button onClick={onCreate}>추가하즈아</button>
      <button onClick={onInit}>초기화즈아</button>
    </div>
  );
}

export default CreateUser;
