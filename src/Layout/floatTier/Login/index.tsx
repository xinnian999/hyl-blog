import { Modal, Tabs } from "antd";
import { useRedux } from "@/hooks";
import Login from "./Login";
import Register from "./Register";
import WechatLogin from "./WechatLogin";

const LoginModal: React.FC = () => {
  const {
    store: {
      loginStore: { loginModal, loginType },
    },
    dispatch,
  } = useRedux();

  const closeModal = () =>
    dispatch({ type: "CHANGE_LOGIN_MODAL", payload: false });

  const tabChange = (key: string) =>
    dispatch({ type: "CHANGE_LOGIN_TYPE", payload: key });

  return (
    <Modal open={loginModal} onCancel={closeModal} footer={null} destroyOnClose>
      {loginType === "wx" ? (
        <WechatLogin />
      ) : (
        <Tabs centered activeKey={loginType} onChange={tabChange}>
          <Tabs.TabPane tab="登陆" key="login">
            <Login />
          </Tabs.TabPane>
          <Tabs.TabPane tab="注册" key="register">
            <Register />
          </Tabs.TabPane>
        </Tabs>
      )}
    </Modal>
  );
};

export default LoginModal;
