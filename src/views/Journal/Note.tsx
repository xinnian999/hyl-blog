import { Prism } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRequest } from "@/hooks";

export default function Note() {
  const [data] = useRequest("/note/query");

  return (
    <div className="note">
      {data.map(({ title, content, id }) => {
        return (
          <div className="note-item" key={id}>
            <p>{title}</p>

            <Prism
              style={tomorrow}
              language={"xml"}
              PreTag="div"
              children={content}
            />
          </div>
        );
      })}
    </div>
  );
}
