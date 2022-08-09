import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.time = setInterval(() => {
      this.setState({ date: new Date() });
      console.log('如果你已离开Clock组件,此定时器应该被销毁');
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.time);
  }

  render() {
    const { date } = this.state;
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>
          现在是
          {' '}
          {date.toLocaleTimeString()}
        </h2>
      </div>
    );
  }
}

export default Clock;
