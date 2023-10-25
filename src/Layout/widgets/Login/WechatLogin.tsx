import { useMount, useRootStore } from '@/hooks';
import { LeftOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import { useState } from 'react';
import { getLoginStatusApi, getWxQrCodeApi } from './api';
import { WxLoginWrapper } from './styled';

function WechatLogin() {
  const [QrCode, setQrCode] = useState('');

  const { setRootState, poll } = useRootStore();

  useMount(() => {
    getWxQrCodeApi().then(res => {
      setQrCode(res.data.qrUrl);

      const timer = setInterval(() => {
        getLoginStatusApi().then(res => {
          if (res.username) {
            clearInterval(poll);

            setRootState({
              loginState: true,
              userInfo: res,
              loginModal: false,
              loginType: 'login',
            });
            setQrCode('');
            return message.success('登录成功');
          }
        });
      }, 1000);

      setRootState({ poll: timer });
    });
  });

  return (
    <WxLoginWrapper>
      <div className='wxHeader'>
        <LeftOutlined
          className='wxHeader-back'
          onClick={() => {
            setRootState({ loginType: 'login' });
            clearInterval(poll);
          }}
        />

        <h2>请使用微信扫码登陆</h2>
      </div>
      <div className='wxQrCode'>
        <Spin spinning={!QrCode} tip='二维码生成中'>
          <img src={QrCode} alt='' />
        </Spin>
      </div>
    </WxLoginWrapper>
  );
}

export default WechatLogin;
