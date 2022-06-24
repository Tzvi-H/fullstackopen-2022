import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const reset = () => setValue("");

  return {
    value,
    type,
    onChange,
    reset,
  };
};
