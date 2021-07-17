/* 파라미터
- props.match.params를 참고한다.
  👉 「path="/profile/:파라미터이름"」 ➡ 「props.match.params.파라미터이름」 으로 가져올 수 있다.
- 보통 특정 id, 이름 등의 데이터 조회 시 사용됨 */

const profileData = {
  uncyclocity: {
    name: "백괴",
    description: "Front-End Engineer @더백괴컴퍼니",
  },
  gildong: {
    name: "길동",
    description: "강동구의 법정동",
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = profileData[username];
  if (!profile) return <div>읎어요</div>;
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
