import React from 'react';
import emitter  from './event';


const Bor = () => {
    
    const handlePush = ()=> {
        emitter.emit('callMe', '非嵌套组件传过来的值');
      }

    return (
        <div>
            <button onClick={handlePush}>点击给非嵌套组件传个值</button>
        </div>
    );
};

export default Bor;