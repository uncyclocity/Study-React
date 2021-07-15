/* 쿼리
- 「location.search」에 *문자열 형식으로* 들어간다.
  (여기서 location 객체란? 주소에 대한 정보를 가지고 있는 객체이다.)
- 서드파티 라이브러리 'qs'를 통해 이를 객체 형태로 변환할 수 있다.
  👉 「변환한 객체.쿼리명」 형태로 쿼리값을 가져올 수 있다. 
- 보통 옵션 값 등에 사용됨*/

import qs from "qs";

const About = ({ location }) => {
  // qs : 문자열 형태의 search값을 객체 형태로 바꿈 ➡ 쿼리값을 가져올 수 있다.
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  // qs로 변환한 객체에서 detail 쿼리를 조회 (쿼리값은 항상 문자열로 찍힌다.)
  const detail = query.detail === "true";

  return (
    <div>
      <h1>소개</h1>
      <p>주저리주저리</p>
      {detail && <p>추가적 정보이다.</p>}
    </div>
  );
};

export default About;
