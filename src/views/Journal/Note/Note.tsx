import { Prism } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useGetData } from "@/hooks";
import "./style.scss";
import { Preview } from "@/components";
import QueueAnim from "rc-queue-anim";

export default function Note() {
  const [data] = useGetData("/note/query");

  return (
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
  );
}
