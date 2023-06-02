import { Button, Form, Input, message } from "antd";
import { pick } from "hyl-utils";
import { loginApi } from "./api";
import { useRedux } from "@/hooks";
import ToolLogin from "./ToolLogin";

function LoginModal() {
  const {
    store: {
      loginStore: { userInfo },
    },
    batchDispatch,
  } = useRedux();

  const { username } = userInfo;

  const onLoginUser = (data) => {
    loginApi(data).then((res) => {
      if (res.status === 0) {
        batchDispatch([
          {
            type: "CHANGE_LOGIN_STATE",
            payload: true,
          },
          {
            type: "CHANGE_USER_INFO",
            payload: pick(res.data, ["username", "id", "headPicture", "email"]),
          },
          { type: "CHANGE_LOGIN_MODAL", payload: false },
        ]);
        message.success(`欢迎您!${username}`);
      } else {
        message.warning("登陆失败");
      }
    });
  };

  return (
    <Form
      name="basic"
      colon={false}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onFinish={onLoginUser}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: "请输入用户名!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit" block>
          登陆
        </Button>
      </Form.Item>

      <ToolLogin />
    </Form>
  );
}

export default LoginModal;
