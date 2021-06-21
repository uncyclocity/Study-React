import { useState, useCallback } from "react";

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);

  // input 내용이 바뀌었을 시에 input 상태를 설정하는 함수
  const onChange = useCallback(
    (e) => {
      const name = e.target.name,
        value = e.target.value;

      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );

  // input 폼을 초기화하는 함수 추가
  const onInit = useCallback(() => {
    setForm(initialForm);
  }, [initialForm]);

  // 상태와 두 함수를 배열에 담아 반환
  return [form, onChange, onInit];
}

export default useInputs;
