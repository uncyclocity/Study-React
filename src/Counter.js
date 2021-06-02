import {Component} from 'react';

class Counter extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         counter: 0
    //     };
    // }

    // 화살표 함수로 메소드 작성하는 class-properties 문법이면, 굳이 constructor 작성 안해도 state 셋팅 가능
    state = {
        counter: 0,
        fixed: 1
    };

    // 방법 1 : 생성자 메소드(constructor)에서 bind 작업 하기
    // constructor(props) {
    //     super(props);
    //     this.handleIncrease = this.handleIncrease.bind(this);
    //     this.handleDecrease = this.handleDecrease.bind(this);
    // }

    // 이렇게 클래스 내부에 종속된 함수를 '메서드'라고 부른다. 보통 이름이 handle로 시작함(의무아님)
    // 방법 2 : 화살표 함수 문법 사용 - 클래스에 특정 속성 선언 가능케 해주는 class-properties 문법 사용, CRA 프로젝트에서 널리 사용
    handleIncrease = () => {
        // this.setState 함수를 사용하려면, button과 연결하면서 컴포넌트 인스턴스와 관계가 끊긴 각 메서드에 바인딩 해주어야 한다.
        // 위 2가지 방법을 사용하면 된다.
        this.setState({
                counter: this.state.counter + 1
            },
            () => {
                console.log('콜백 함수 실행');
            }
        );
    };

    handleDecrease = () => {
        // 함수형 업데이트를 사용하면, setState를 복수로 사용할 수 있다.
        // 그냥 두번 써서 안되는 이유는 setState가 상태를 바꾸는 함수가 아닌, 상태를 바꿔달라고 요청하는 함수이기 때문이다.
        this.setState(state => ({
            counter: state.counter - 1
        }));
        this.setState(state => ({
            counter: state.counter - 1
        }));
    };

    render() {
        return (
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
                {/* setState에 넣어주지 않은 값은 그 값이 유지된다*/}
                <p>바뀌지 않는 값 : {this.state.fixed}</p>
            </div>
        );
    }
}

export default Counter;