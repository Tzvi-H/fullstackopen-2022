import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  return {
    value,
    type,
    onChange,
  };
};
