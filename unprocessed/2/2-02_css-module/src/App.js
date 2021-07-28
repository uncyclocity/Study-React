import { useState } from "react";

import CheckBox from "./components/CheckeBox";

function App() {
  const [check, setCheck] = useState(false);
  const onChange = (e) => {
    setCheck(e.target.checked);
  };
  return (
    <div>
      <CheckBox checked={check} onChange={onChange}>
        모든 약관에 동의합니다.
      </CheckBox>
      <p>
        <b>check: </b>
        {check ? "true" : "false"}
      </p>
    </div>
  );
}

export default App;
