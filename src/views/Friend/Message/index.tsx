import { Plate, Comment } from "@/components";

export default function Message() {
  return (
    <Plate title="留言板">
      <Comment articleId="99999" btnName="提交留言" />
    </Plate>
  );
}
