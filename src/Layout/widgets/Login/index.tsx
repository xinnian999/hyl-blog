import { useRootStore } from '@/hooks';
import { Modal, Tabs } from 'antd';
import Login from './Login';
import Register from './Register';
import WechatLogin from './WechatLogin';

const LoginModal: React.FC = () => {
  const { loginModal, loginType, setRootState, poll } = useRootStore();

  return (
    <Modal
      open={loginModal}
      onCancel={() => {
        setRootState({ loginModal: false });
        clearInterval(poll);
      }}
      footer={null}
      destroyOnClose
    >
      {loginType === 'wx' ? (
        <WechatLogin />
      ) : (
        <Tabs
          centered
          activeKey={loginType}
          onChange={(key: any) => setRootState({ loginType: key })}
        >
          <Tabs.TabPane tab='登陆' key='login'>
            <Login />
          </Tabs.TabPane>
          <Tabs.TabPane tab='注册' key='register'>
            <Register />
          </Tabs.TabPane>
        </Tabs>
      )}
    </Modal>
  );
};

export default LoginModal;
