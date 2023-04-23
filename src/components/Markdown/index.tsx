import { forwardRef, memo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CopyOutlined, LinkOutlined } from "@ant-design/icons";
import { copy } from "hyl-utils";
import "./style.scss";
import { Skeleton } from "antd";

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "language-javascript");
    return !inline && match ? (
      <div className="copy-content">
        <button className="copy" onClick={() => copy(node.children[0].value)}>
          <CopyOutlined />
        </button>
        <SyntaxHighlighter
          showLineNumbers
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      </div>
    ) : (
      <span className="text-shadow">{node.children[0].value}</span>
    );
  },
  h2(props) {
    return (
      <div className="md-title-box">
        <h2
          children={props.children}
          id={props.children}
          className="md-title2"
        />
      </div>
    );
  },
  h3(props) {
    return (
      <h3 children={props.children} id={props.children} className="md-h3" />
    );
  },
  hr() {
    return <hr className="hr" />;
  },
  a(props) {
    return (
      <span>
        <LinkOutlined /> <a href={props.href}>{props.children[0]}</a>
      </span>
    );
  },
};

const MarkDetail = (props, ref) => {
  const { content } = props;

  return (
    <Skeleton loading={!content} paragraph={{ rows: 30 }}>
      <div
        style={{
          overflow: "hidden",
          position: "relative",
        }}
        ref={ref}
      >
        <ReactMarkdown
          components={components as any}
          children={content}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          className="ReactMarkdown"
        />
      </div>
    </Skeleton>
  );
};

export default memo(forwardRef(MarkDetail));
