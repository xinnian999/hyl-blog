import React, { PureComponent } from 'react';
import { Button } from 'antd';
import CodeDiff from 'react-code-diff-lite';
import Editor from 'for-editor';
import './style.scss';

const newStr = `[
  {
    "author": "hyl",
    "avatar": "https://www.hyl999.cn:7777/headPictures/avatarhyl-1636988649484.jpg",
    "content": "qaa",
    "datetime": "2021-11-16 17:16:33"
  },
  {
    "author": "hyl",
    "avatar": "https://www.hyl999.cn:7777/headPictures/avatarhyl-1636988649484.jpg",
    "content": "3",
    "datetime": "2021-11-15 23:57:19"
  },
  {
    "author": "心念",
    "avatar": "https://www.hyl999.cn:7777/headPictures/avatarhyl-1636906967621.jpg",
    "content": "66666",
    "datetime": "2021-11-15 21:55:50"
  }
]`;

const Main = ({ value, style }) => (
  <div>
    <CodeDiff
      oldStr={value}
      newStr={newStr}
      context={10}
      // outputFormat="line-by-line"
      // theme="dark"
    />
  </div>
);
class index extends PureComponent {
  state = {
    value: `[
  {
    "author": "hyl999",
    "avatar": "https://www.hyl999.cn:7777/headPictures/avatarhyl-1636988649484.jpg",
    "content": "qaa",
    "datetime": "2021-11-16 17:16:33"
  },
  {
    "author": "hyl",
    "avatar": "https://www.hyl999.cn:7777/headPictures/avatarhyl-1636988649484.jpg",
    "content": "3",
    "datetime": "2021-11-15 23:57:19"
  },
  {
    "author": "心念",
    "avatar": "https://www.hyl999.cn:7777/headPictures/avatarhyl-1636906967621.jpg",
    "content": "66666",
    "datetime": "2021-11-15 21:55:50"
  }
]`,
    visible: false,
  };

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { value, visible } = this.state;
    const editorStyle = {
      zIndex: '99999999',
      width: '30%',
      position: 'absolute',
      left: 0,
      top: '35px',
      display: visible ? 'none' : 'block',
    };
    return (
      <div className="Demo">
        <Button onClick={() => this.setState({ visible: !visible })}>编辑/预览</Button>
        <Editor
          value={value}
          onChange={(value) => this.handleChange(value)}
          style={editorStyle}
          // height="100%"
          toolbar={false}
          theme="dark"
        />
        <Main value={value} />
      </div>
    );
  }
}

export default index;
