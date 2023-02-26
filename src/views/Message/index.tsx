import { Plate, Comment } from "@/components";
import "./style.scss";

export default function Message() {
  return (
    <>
      <Plate title="留言板" autograph="沟通交流，拉近你我！">
        <Comment articleId={99999} btnName="提交留言" hasAnimation />
      </Plate>
    </>
  );
}
