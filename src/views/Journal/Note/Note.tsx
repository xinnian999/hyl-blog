import { Prism } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useGetData } from "@/hooks";
import "./style.scss";
import { Plate, Preview } from "@/components";
import QueueAnim from "rc-queue-anim";

export default function Note() {
  const [data] = useGetData("/note/query");

  return (
    <Plate
      title="笔记"
      autograph="哪里有天才，我是把别人喝咖啡的工夫都用在了工作上了。"
      bg="bg16.jpg"
    >
      <div className="note">
        <QueueAnim
          className="demo-content"
          animConfig={[
            { opacity: [1, 0], translateY: [0, 300] },
            { opacity: [1, 0], translateY: [0, -300] },
          ]}
          interval={0}
        >
          {data.map(({ title, content, id }) => {
            return (
              <div className="note-item " key={id}>
                <div className="note-item-content">
                  <p>{title}</p>
                  <Preview title={title}>
                    <Prism
                      style={tomorrow}
                      language={"xml"}
                      PreTag="div"
                      children={content}
                    />
                  </Preview>
                </div>
              </div>
            );
          })}
        </QueueAnim>
      </div>
    </Plate>
  );
}
