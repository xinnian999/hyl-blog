import React,{useState, useEffect} from 'react';
import emitter  from './event';

const Child = () => {

    const [val,setVal] = useState('初始值')

    useEffect(()=>{
        const listenerFn = data=>{
            // 接收传过来的值
            setVal(data)
        }
        // 创建监听事件
        emitter.addListener('callMe',listenerFn)

        // 销毁监听
        return ()=>emitter.removeListener('callMe',listenerFn)

    },[])

    return (
        <div>
            {val}
        </div>
    );
};

export default Child;