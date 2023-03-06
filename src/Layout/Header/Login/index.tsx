import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Alert,
  Upload,
  Space,
  Avatar,
  Spin,
  Popover,
} from "antd";
import { getRandom, pick } from "hyl-utils";
import { LoadingOutlined, PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { loginApi, registerApi } from "./api";
import { clearLogin } from "@/utils";
import { useSetState, useBoolean, useRedux, useWindowSize } from "@/hooks";
import ToolLogin from "./ToolLogin";
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
  const [{ imageUrl, loading, wxLogin, wxLoginQr }, setState] =
    useSetState<any>({
      imageUrl: "",
      loading: false,
      wxLogin: false,
      wxLoginQr: "",
      modalVisible: false,
    });

  const [isRegister, , offRegister, toggleRegister] = useBoolean(false);

  const { store, dispatchAll, dispatch } = useRedux();

  const { width } = useWindowSize();

  const { username, headPicture } = store.userInfo;

  const randomAvatar = () => {
    const random = getRandom(0, 5);
    setState({
      imageUrl: `/api/avatar/${avatar[random]}`,
    });
  };

  const onLoginUser = (data) => {
    loginApi(data).then((res) => {
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
          { type: "CHANGE_LOGIN_MODAL", payload: false },
        ]);
        message.success(`欢迎您!${username}`);
      } else {
        message.warning("登陆失败");
      }
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
          offRegister();
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

  const renderUserMenus = (
    <Space direction="vertical">
      <div className="username">昵称 : {username}</div>

      <Button onClick={clearLogin}>退出登录</Button>
    </Space>
  );

  return (
    <>
      {store.loginState ? (
        <Popover content={renderUserMenus} trigger="hover" placement="bottom">
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
          onClick={() =>
            dispatch({ type: "CHANGE_LOGIN_MODAL", payload: true })
          }
        >
          登录
        </Avatar>
      )}

      <Modal
        title={isRegister ? "注册" : "登陆"}
        open={store.loginModal}
        onCancel={() =>
          dispatch({ type: "CHANGE_LOGIN_MODAL", payload: false })
        }
        footer={null}
        destroyOnClose
      >
        {wxLogin ? (
          <>
            <div className="wxHeader">
              <LeftOutlined
                className="wxHeader-back"
                onClick={() => setState({ wxLogin: false, wxLoginQr: "" })}
              />

              <h2>请使用微信扫码登陆</h2>
            </div>
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

            {!isRegister && <ToolLogin setState={setState} />}
          </Form>
        )}
      </Modal>
    </>
  );
}
