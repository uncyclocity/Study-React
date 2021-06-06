import {MdCheckBox, MdCheckBoxOutlineBlank} from 'react-icons/md'
import styles from './CheckBox.module.css'
import classNames from 'classnames/bind'
/*
CSS Module은 Sass에서도 사용할 수 있으며, .module.scss로 바꿔주면 끝이다.

고유화 하지 않고 전역적 클래스 이름을 사용하기
:global .my-global-name{}
:global {.my-global-name{}}(sass)

번외) CSS Module을 사용하지 않는 곳에서 고유 이름을 만들어서 사용하기
:local .make-this-local{}
:local {.make-this-local{}}(sass)
*/

const cx = classNames.bind(styles);
/*
순정 CSS Module vs w/classNames/bind
styles.one vs cx('one')
${styles.one} ${styles.two} vs cx('one', 'two')
style[my-component] vs cx('my-component')

오늘의 결론 : CSS Module을 classNames 라이브러리에 싸서 드셔보세요
*/

function CheckBox({children, checked, ...rest}) {
    return (
        <div className={cx('checkbox')}>
            <label>
                {/* rest에 onChange={onChange} 구문이 있다맨이야*/}
                <input type="checkbox" checked={checked} {...rest}/>
                <div className={cx('icon')}>{checked ? <MdCheckBox className={cx('checked')}/> : <MdCheckBoxOutlineBlank />}</div>
            </label>
            <span>{children}</span>
        </div>
    );
}

export default CheckBox;