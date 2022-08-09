import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PageCenter } from "@/components";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <PageCenter>
      <Result
        status="404"
        title="404"
        subTitle="页面不存在"
        style={{ backgroundColor: "#fff" }}
        extra={
          <Button type="primary" onClick={() => navigate("/home")}>
            返回首页
          </Button>
        }
      />
    </PageCenter>
  );
};

export default NotFound;
