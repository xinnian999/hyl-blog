// @ts-nocheck
import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { CopyOutlined } from "@ant-design/icons";
import { copy } from "@/utils";
import "./style.scss";

const components = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <div className="code-content">
        <button
          type="primary"
          className="copy"
          onClick={() => copy(node.children[0].value)}
        >
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
      <h2 children={props.children} id={props.children} className="md-title" />
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
};

const MarkDetail = (props, ref) => {
  const { content, maxHeight } = props;

  return (
    <div
      style={{
        height: `${maxHeight}px`,
        overflow: "hidden",
        position: "relative",
      }}
      ref={ref}
    >
      <ReactMarkdown
        components={components}
        children={content}
        // rehypePlugins={[raw]}
        remarkPlugins={[remarkGfm]}
        className="ReactMarkdown"
      />
    </div>
  );
};

export default forwardRef(MarkDetail);
