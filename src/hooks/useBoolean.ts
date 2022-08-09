import { useState } from "react";

type setFlag = () => void;

type useBooleanResult = [boolean, setFlag, setFlag, () => void];

const useBoolean = (defaultValue: boolean = false): useBooleanResult => {
  const [boolean, setBoolean] = useState(defaultValue);

  const setTrue = () => setBoolean(true);

  const setFalse = () => setBoolean(false);

  const toggle = () => setBoolean(!boolean);

  return [boolean, setTrue, setFalse, toggle];
};

export default useBoolean;
