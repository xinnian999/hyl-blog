import { useEffect, useMemo, useState } from "react";

const UseMemoDemo = () => {
  // 调用这个函数需要大量时间去计算
  const slowFunction = (number: any) => {
    console.log("calling slow function");
    for (let i = 0; i <= 100000; i++) {
      console.log(i);
    }
    return number * 2;
  };
  const [inputNumber, setInputNumber] = useState(1);
  const [dark, setDark] = useState(true);

  // 场景1:执行某函数需要大量时间，使用useMemo来优化，在不必要执行函数的时候不执行函数
  const doubleNumber = useMemo(() => slowFunction(inputNumber), [inputNumber]);

  // 场景2:每次组件更新会重新执行，内部的引用类型变量会重新创建，这会导致使用到引用类型变量的组件重新渲染，使用useMemo来让每次的变量相同
  const themeStyle = useMemo(() => {
    return {
      background: dark ? "black" : "white",
      color: dark ? "white" : "black",
    };
  }, [dark]);

  useEffect(() => {
    console.log("themeStyle changed");
  }, [themeStyle]);
  const handleChange = (e: any) => {
    setInputNumber(parseInt(e.target.value));
  };
  return (
    <>
      <input type="text" value={inputNumber} onChange={handleChange} />
      <button
        onClick={() => {
          setDark((prevDark) => !prevDark);
        }}
      >
        change theme
      </button>
      <p style={themeStyle}>{doubleNumber}</p>
    </>
  );
};
export default UseMemoDemo;
