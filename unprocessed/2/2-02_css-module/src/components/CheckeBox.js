/*
  CSS Module
  - 고유 클래스명을 통해, 클래스명 중복을 방지한다.
  - 서드파티 라이브러리이나, webpack의 css-loader 환경에서는 기본으로 지원한다. 👉 CRA도 해당
  - 확장자를 '.module.css'로 하여 사용한다.
*/

import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
// import styles from "./CheckBox.module.css";
// sass 또한 css module 형태로 사용할 수 있다.
import styles from "./CheckBox.module.scss";
import classNames from "classnames/bind";

// classnames lib로 css module을 bind해주면, 보다 간편한 클래스네임 지정이 가능해진다.
const cx = classNames.bind(styles);

function CheckBox({ children, checked, ...rest }) {
  return (
    // not used classnames lib
    <div className={styles.checkbox}>
      <label>
        <input type="checkbox" checked={checked} {...rest} />
        {/* used classnames lib */}
        <div className={cx("icon")}>
          {checked ? (
            <MdCheckBox className={cx("checked")} />
          ) : (
            <MdCheckBoxOutlineBlank />
          )}
        </div>
      </label>
      <span>{children}</span>
    </div>
  );
}

export default CheckBox;
