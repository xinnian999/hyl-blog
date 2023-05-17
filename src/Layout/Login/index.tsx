import { Modal, Tabs } from "antd";
import { useRedux } from "@/hooks";
import Login from "./Login";
import Register from "./Register";
import WechatLogin from "./WechatLogin";
import { useState } from "react";
import LoginContext from "./context";

function LoginModal() {
  const [type, setType] = useState("login");

  const { store, dispatch } = useRedux();

  return (
    <Modal
      open={store.loginModal}
      onCancel={() => dispatch({ type: "CHANGE_LOGIN_MODAL", payload: false })}
      footer={null}
      destroyOnClose
    >
      <LoginContext.Provider value={{ setType }}>
        {type !== "wx" ? (
          <Tabs centered activeKey={type} onChange={(key) => setType(key)}>
            <Tabs.TabPane tab="登陆" key="login">
              <Login />
            </Tabs.TabPane>
            <Tabs.TabPane tab="注册" key="register">
              <Register />
            </Tabs.TabPane>
          </Tabs>
        ) : (
          <WechatLogin />
        )}
      </LoginContext.Provider>
    </Modal>
  );
}

export default LoginModal;
