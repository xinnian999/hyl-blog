import { Plate, Comment } from "@/components";
import "./style.scss";

export default function Message() {
  return (
    <>
      <Plate title="留言板" autograph="我们可能天生怕冷， 但我们天生就会拥抱。">
        <Comment articleId={99999} btnName="提交留言" hasAnimation />
      </Plate>
    </>
  );
}
