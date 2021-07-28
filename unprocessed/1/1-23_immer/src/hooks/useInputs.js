import { useState, useCallback } from "react";
import produce from "immer";

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((e) => {
    const name = e.target.name,
      value = e.target.value;

    /*
      immer을 이용한 상태 업데이트 함수를 이용하여 함수형 업데이트를 진행해 줌 => spread 연산자를 통한 복사 없이도 ㄱㄴ
      produce((업데이트하려는 상태의 복사본) => {상태를 바꾸는 함수}) : 상태 업데이트를 하는 함수를 반환한다.
    */
    setForm(
      // form => ({
      //   ...form,
      //   [name]: value
      // })
      produce((draft) => {
        draft[name] = value;
      })
    );
  }, []);

  const onInit = useCallback(() => {
    setForm(initialForm);
  }, [initialForm]);

  return [form, onChange, onInit];
}

export default useInputs;
