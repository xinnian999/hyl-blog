import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Alert,
  Upload,
  Divider,
  Space,
  Avatar,
  Spin,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import md5 from "js-md5";
import cookie from "js-cookie";
import { clearLogin, getRandom, request } from "@/utils";
import {
  useSetState,
  useRequest,
  useBoolean,
  useRedux,
  useWindowSize,
} from "@/hooks";
import "./style.scss";
import { PageHeader, Popover } from "@arco-design/web-react";
import { pick } from "lodash";

const avatar = [
  "img_1.jpeg",
  "img_2.jpeg",
  "img_3.jpg",
  "img_4.png",
  "img_5.jpeg",
  "img_6.jpg",
];

export default function Login() {
  const [{ imageUrl, imgNum, loading, wxLogin, wxLoginQr }, setState] =
    useSetState<any>({
      imageUrl: "",
      imgNum: [],
      loading: false,
      wxLogin: false,
      wxLoginQr: "",
    });

  const [modalVisible, onModal, offModal] = useBoolean(false);

  const [isRegister, , offRegister, toggleRegister] = useBoolean(false);

  const { store, dispatchAll } = useRedux();

  const { width } = useWindowSize();

  const { username, headPicture } = store.userInfo;

  const [, runOnLogin] = useRequest("/user/login", {
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
            payload: pick(res.data, ["username", "id", "headPicture", "email"]),
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

  const [, runOnRegister] = useRequest("/user/register", {
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

  const [, runGetWx] = useRequest("/qq/getWxQrCode", {
    method: "get",
    manual: true,
    progress: false,
    onSuccess: (res: any) => {
      setState({ wxLoginQr: res.data.qrUrl });
      const timer = setInterval(() => {
        request("/qq/wxLoginState").then((res) => {
          if (res) {
            const { nickName, avatarUrl, openId } = res;
            clearInterval(timer);
            dispatchAll([
              {
                type: "CHANGE_LOGIN_STATE",
                payload: true,
              },
              {
                type: "CHANGE_USER_INFO",
                payload: {
                  username: nickName,
                  headPicture: avatarUrl,
                  id: openId,
                },
              },
            ]);
            offModal();
            setState({ wxLogin: false, wxLoginQr: "" });
            return message.success("登录成功");
          }
        });
      }, 1000);
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

  const renderUserMenus = (
    <Space direction="vertical">
      <div className="username">昵称 : {username}</div>

      <Button onClick={clearLogin}>退出登录</Button>
    </Space>
  );

  return (
    <>
      {store.loginState ? (
        <Popover content={renderUserMenus} trigger="hover">
          <Avatar
            src={headPicture}
            className="userAvatar"
            size={width > 800 ? 35 : 30}
          />
        </Popover>
      ) : (
        <Avatar
          className="userAvatar"
          size={width > 800 ? 40 : 30}
          onClick={onModal}
        >
          登录
        </Avatar>
      )}

      <Modal
        title={isRegister ? "注册" : "登陆"}
        visible={modalVisible}
        onCancel={offModal}
        footer={null}
        destroyOnClose
      >
        {wxLogin ? (
          <>
            <PageHeader
              title="微信登陆"
              subTitle="请使用微信扫码登陆"
              backIcon
              onBack={() => setState({ wxLogin: false, wxLoginQr: "" })}
            />
            <div className="wxQrCode">
              <Spin spinning={!wxLoginQr} tip="二维码生成中">
                <img src={wxLoginQr} alt="" />
              </Spin>
            </div>
          </>
        ) : (
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
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
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
              </>
            )}

            <Form.Item label=" ">
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
                  <svg
                    className="qqLogin"
                    fill="#50c8fd"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                    onClick={qqLogin}
                  >
                    <path
                      d="M12.003 2c-2.265 0-6.29 1.364-6.29 7.325v1.195S3.55 14.96 3.55 17.474c0 .665.17 1.025.281 1.025.114 0 .902-.484 1.748-2.072 0 0-.18 2.197 1.904 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.239.425 6.287.687 6.287 0 0-.688-1.768-1.182-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.111 0 .283-.36.283-1.025 0-2.514-2.166-6.954-2.166-6.954V9.325C18.29 3.364 14.268 2 12.003 2z"
                      fillRule="evenodd"
                    ></path>
                  </svg>

                  <svg
                    className="wxLogin"
                    fill="#60c84d"
                    viewBox="0 0 24 24"
                    width="40"
                    height="40"
                    onClick={() => {
                      setState({ wxLogin: true });
                      runGetWx();
                    }}
                  >
                    <path
                      d="M2.224 21.667s4.24-1.825 4.788-2.056C15.029 23.141 22 17.714 22 11.898 22 6.984 17.523 3 12 3S2 6.984 2 11.898c0 1.86.64 3.585 1.737 5.013-.274.833-1.513 4.756-1.513 4.756zm5.943-9.707c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272zm7.583 0c.69 0 1.25-.569 1.25-1.271a1.26 1.26 0 0 0-1.25-1.271c-.69 0-1.25.569-1.25 1.27 0 .703.56 1.272 1.25 1.272z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </>
            )}
          </Form>
        )}
      </Modal>
    </>
  );
}
