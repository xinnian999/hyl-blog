import rootStore from '@/rootStore';
import { cookie } from 'hyl-utils';
import request from './request';
import { message } from 'antd';

const { setState } = rootStore;

const clearLogin = () => {
  request({ url: '/qq/clearLoginInfo', method: 'post' }).then((res) => {
    if (res) {
      setState({ loginState: false });
      cookie.remove('blog_token');
      cookie.remove('vip_token');
      message.success('已退出登陆');
    }
  });
};

export default clearLogin;
