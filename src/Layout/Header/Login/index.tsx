import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Alert,
  Upload,
  Divider,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import md5 from "js-md5";
import cookie from "js-cookie";
import { getRandom } from "@/utils";
import { useSetState, useRequest, useBoolean, useRedux } from "@/hooks";
import "./style.scss";

const avatar = [
  "img_1.jpeg",
  "img_2.jpeg",
  "img_3.jpg",
  "img_4.png",
  "img_5.jpeg",
  "img_6.jpg",
];

export default function Login() {
  const [{ imageUrl, imgNum, loading }, setState] = useSetState<any>({
    imageUrl: "",
    imgNum: [],
    loading: false,
  });

  const [modalVisible, onModal, offModal] = useBoolean(false);

  const [isRegister, , offRegister, toggleRegister] = useBoolean(false);

  const { dispatchAll } = useRedux();

  const [, , runOnLogin] = useRequest("/user/login", {
    method: "post",
    manual: true,
    progress: true,
    onSuccess: (res: any) => {
      const { username } = res.data;

      if (res.status === 0) {
        dispatchAll([
          {
            type: "CHANGE_LOGIN_STATE",
            payload: true,
          },
          {
            type: "CHANGE_USER_INFO",
            payload: res.data,
          },
        ]);
        offModal();
        message.success(`欢迎您!${username}`);
      }
      if (res.status === 1) {
        message.warning("登陆失败");
      }
    },
  });

  const [, , runOnRegister] = useRequest("/user/register", {
    method: "post",
    manual: true,
    progress: true,
    onSuccess: (res: any) => {
      if (res.status === 0) {
        message.success("注册成功");
        offRegister();
      }
      if (res.status === 1) {
        message.warning("用户名已存在");
      }
    },
  });

  const randomAvatar = () => {
    const random = getRandom(0, 5, imgNum);
    setState({ imgNum: [random], imageUrl: `/api/avatar/${avatar[random]}` });
  };

  const onLoginUser = (values: any) => {
    const { username, password } = values;
    runOnLogin({ data: { username, password: md5(password) } });
  };

  const onRegisterUser = (values: any) => {
    if (!imageUrl) {
      randomAvatar();
    }
    setState((state: any) => {
      runOnRegister({
        data: {
          ...values,
          headPicture: state.imageUrl,
          password: md5(values.password),
        },
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

  const qqLogin = () => {
    window.open(
      `https://graph.qq.com/oauth2.0/authorize?client_id=102011435&state=${cookie.get(
        "csrf_token"
      )}&response_type=code&redirect_uri=https://www.hyl999.co/api/qq/qqLoginCallback`,
      "_self"
    );
  };

  return (
    <>
      <Button type="primary" ghost onClick={onModal}>
        登陆
      </Button>
      <Modal
        title={isRegister ? "注册" : "登陆"}
        visible={modalVisible}
        onCancel={offModal}
        footer={null}
      >
        <Form
          name="basic"
          colon={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={isRegister ? onRegisterUser : onLoginUser}
          autoComplete="off"
        >
          {isRegister && (
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
          )}

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

          {isRegister && (
            <>
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
                {" "}
                <Alert
                  message={
                    <span>
                      头像：未上传将使用随机头像
                      <br />{" "}
                      邮箱：注册后不支持修改，将用于接收回复通知的邮件、或找回密码
                    </span>
                  }
                />
              </Form.Item>
            </>
          )}

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit" block>
              {isRegister ? "立即注册" : "登陆"}
            </Button>

            <Button
              onClick={toggleRegister}
              block
              style={{ marginTop: "10px" }}
            >
              {isRegister ? "已有账号？立即登录" : "没有账号？ 立即注册"}
            </Button>
          </Form.Item>

          {!isRegister && (
            <>
              <Divider>第三方登录</Divider>
              <div className="toolLogin">
                <Button onClick={qqLogin} className="qqLogin">
                  <img
                    src="https://connect.qq.com/favicon.ico"
                    alt=""
                    className="qqIcon"
                  />{" "}
                  qq登录
                </Button>
              </div>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}
