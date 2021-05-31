// useContext라는 Hook를 통해 UserDispatch Context를 조회해야 한다
import React, {useEffect, useRef, useContext} from 'react';
import {UserDispatch} from './App';

// Array.prototype.map() 을 통해 호출되는 함수
const User = React.memo(function User({user}) {
    // dispatch를 사용하기 위해 UserDispatch Context를 조회함
    const dispatch = useContext(UserDispatch);

    /* 
    useEffect : 컴포넌트 랜더링 때마다 특정 작업 실행할 수 있도록 하는 Hook -> useEffect(function, deps)

    1. Component가 mount 되었을 때 (나타났을 때)
    - Component가 가장 처음 렌더링 되었을 때 한 번만 실행하려면, deps 위치에 빈 배열을 넣는다
    - Component가 렌더링 될 때마다 실행하려면, deps 위치에 아무것도 안 넣으면 된다

    2. Component가 업데이트 될 때 (특정 props, state가 바뀔 때)
    - 특정 props, state 값이 변경되었을 때 실행하려면, deps 위치에 변화를 검사할 값을 집어넣으면 된다
    - deps 값이 업데이트 될 때만 지정한 작업을 실행하려면, 아래의 예시를 참고하면 좋다

    3. Component가 unmount 되었을 때 (사라질 때) & update 되기 직전에
    - cleanup 함수가 반환되며, 이는 return 뒤에 나오는 함수를 의미한다.
    - unmount 될 때에만 cleanup 함수를 실행하고 싶을 경우, deps 위치에 빈 배열을 넣는다
    */

    // 예시 : deps 값이 업데이트 될 때만 지정한 작업 실행
    const isMounted = useRef(false);
    useEffect(() => {
        // deps 값이 있으므로 가장 첫 렌더링만 신경써주면 된다
        if (!isMounted.current) {
            isMounted.current = true;
        } else {
            console.log('deps 값이 업데이트됨');
        }
    },[user]);

    return(
        // jsx 외부에서 정의 된 event handler/callback은 파라미터를 넘겨줄 시 화살표 함수를 사용하여야 한다.
        <div>
            <b style={{
                cursor: 'pointer',
                color: user.active ? 'green' : 'black'
            }}
            onClick = {() => {
                dispatch({type: 'TOGGLE_USER', id: user.id});
            }}> {user.username} </b>
            <span>({user.email})</span>
            <button onClick={() => {
                dispatch({type: 'REMOVE_USER', id: user.id})
            }}>삭제</button>
        </div>
    );
});

function UserList({users}) {
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
                />
            ))}
        </div>
    );
}

export default React.memo(UserList);