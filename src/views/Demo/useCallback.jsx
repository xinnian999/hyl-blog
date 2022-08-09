import  { useState, useCallback,memo } from 'react';

// 父组件，给子组件传递name和changeName方法
const Parent = () => {
  const [count, setCount] = useState(1);
  const [name, setName] = useState("bbz");
  const addCount = () => {
    setCount(count + 1);
  };
  
  const changeName = useCallback((n) => {
    setName(n);
  }, []);


  return (
    <>
      <div onClick={addCount}>计数: {count}</div>
      <Child name={name} changeName={changeName} />
    </>
  );
};

// 子组件
const Child =memo( ({ name, changeName }) => {
  console.log("child start---");
  return (
    <div
      onClick={() => {
        changeName("bobozai");
      }}
    >
      child comps: {name}
    </div>
  );
})

export default Parent;


// 如果不使用useCallback,则点击父组件计数的同时，子组件会重新渲染（console了），显然这是没必要的
// 因为更新count时父组件会重新渲染，导致重新生成了一个changeName函数，
// 所以子组件的props变了，导致子组件会重新渲染
// 而对changeName函数用useCallback进行包裹，则对函数进行缓存不会重新生成