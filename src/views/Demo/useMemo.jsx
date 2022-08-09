import React, { useState, useMemo } from 'react';
import './style.scss';

function Child({ name, children }) {
  function changeName(name) {
    console.log('11');
    return `${name}改变name的方法`;
  }

  const otherName = changeName(name)
  return (
    <>
      <div>{otherName}</div>
      <div>{children}</div>
    </>
  );
}

function App() {
  const [name, setName] = useState('名称');
  const [content, setContent] = useState('内容');
  return (
    <>
      <button onClick={() => setName(new Date().getTime())}>name</button>
      <button onClick={() => setContent(new Date().getTime())}>content</button>
      <Child name={name}>{content}</Child>
    </>
  );
}

export default App;
