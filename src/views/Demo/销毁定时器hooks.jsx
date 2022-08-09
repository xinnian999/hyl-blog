import React, { useState, useEffect } from 'react';

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const time = setInterval(() => {
      setDate(new Date());
      console.log('如果你已离开Clock组件,此定时器应该被销毁');
    }, 1000);

    // 模拟组件销毁时生命周期
    return () => clearInterval(time);
  }, []);

  return (
    <div>
      现在是:
      {date.toLocaleTimeString()}
    </div>
  );
}

export default Clock;
