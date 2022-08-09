import React, { PureComponent } from 'react';

// 如果一个组件订阅了Context，那么这个组件会从离自身最近的那个匹配的 Provider 中读取到当前的context值；
// defaultValue是组件在查找过程中没有找到对应的Provider，那么就使用默认值
const defaultValue = {
  name: '一个默认值',
};
// 创建一个context容器：
const Store = React.createContext(defaultValue);
// Provider生产者 : 用于包裹传值的前辈组件;
// Consumer消费者 : 用于包裹接收值的后辈组件;
const { Provider, Consumer } = Store;

const Sun = () => (
  <Consumer>
    {(value) => (
      <div>
        我是孙组件,消费者,接收到了：
        {value.name}
      </div>
    )}
  </Consumer>
);

const Son = () => (
  <Consumer>
    {(value) => (
      <div>
        我是子组件,消费者,接收到了：
        {value.name}
        <Sun />
      </div>
    )}
  </Consumer>
);

class Father extends PureComponent {
  render() {
    const name = 'hello world';
    return (
    // Provider通过value将值传递出去
      <Provider value={name}>
        <div>
          我是父组件，生产者，生产出了：
          {name}
          <Son />
          {/* <Brother />  */}
        </div>
      </Provider>
    );
  }
}

export default Father;
