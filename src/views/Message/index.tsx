import { Plate, PageCenter, Comment } from "@/components";

export default function Message() {
  return (
    <>
      <Plate title="留 言 板" autograph="沟通交流，拉近你我！">
        <Comment articleId={99999} btnName="提交留言" hasAnimation />
      </Plate>
    </>
  );
}
