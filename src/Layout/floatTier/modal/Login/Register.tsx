import { Button, Form, Input, message, Alert, Upload } from "antd";
import { getRandom } from "hyl-utils";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { registerApi } from "./api";
import { useGlobalStore, useSetState } from "@/hooks";

const avatar = [
  "img_1.jpeg",
  "img_2.jpeg",
  "img_3.jpg",
  "img_4.png",
  "img_5.jpeg",
  "img_6.jpg",
];

function LoginModal() {
  const [{ imageUrl, loading }, setState] = useSetState<any>({
    imageUrl: "",
    loading: false,
  });

  const { setGlobalState } = useGlobalStore();

  const randomAvatar = () => {
    const random = getRandom(0, 5);
    setState({
      imageUrl: `/api/avatar/${avatar[random]}`,
    });
  };

  const onRegisterUser = (values) => {
    if (!imageUrl) {
      randomAvatar();
    }
    setState((state: any) => {
      registerApi({
        ...values,
        headPicture: state.imageUrl,
      }).then((res) => {
        if (res.status === 0) {
          message.success("注册成功");
          setGlobalState({ loginType: "login" });
        }
        if (res.status === 1) {
          message.warning("用户名已存在");
        }
      });
    });
  };

  const onUploadChange = (info: any) => {
    if (info.file.status === "uploading") {
      setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      const uploadUrl = `/api/headPicture/${info.file.response.filename}`;

      setState({
        imageUrl: uploadUrl,
        loading: false,
      });
    }
  };

  return (
    <Form
      colon={false}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onFinish={onRegisterUser}
      autoComplete="off"
    >
      <Form.Item label="头像">
        <Upload
          name="headPicture"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/api/upload/headPicture"
          onChange={onUploadChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>点击上传</div>
            </div>
          )}
        </Upload>
        <Button onClick={randomAvatar}>随机头像</Button>
      </Form.Item>

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

      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          {
            required: true,
            message: "请输入正确的邮箱!",
            type: "email",
          },
        ]}
      >
        <Input placeholder="xxx@xxx.com" />
      </Form.Item>

      <Form.Item label=" ">
        <Alert
          message={
            <span>
              头像：未上传将使用随机头像
              <br />
              邮箱：注册后不支持修改，将用于接收回复通知的邮件、或找回密码
            </span>
          }
        />
      </Form.Item>

      <Form.Item label=" ">
        <Button type="primary" htmlType="submit" block>
          立即注册
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginModal;
