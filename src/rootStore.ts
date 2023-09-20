import { omit } from 'hyl-utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoreTypes = {
  theme: 'light' | 'dark';
  primaryColor: string;
  userInfo: {
    id: number;
    username: string;
    headPicture: string;
    email: string;
  };
  loginModal: boolean;
  loginState: boolean;
  loginType: 'login' | 'register' | 'wx';
  chatGptData: any[];
};

const store = persist<StoreTypes, [], [], Omit<StoreTypes, 'loginModal'>>(
  set => ({
    theme: 'light',
    primaryColor: '#d6324d',
    userInfo: { id: 0, username: '昵称', headPicture: '', email: '' },
    loginModal: false,
    loginState: false,
    loginType: 'login',
    chatGptData: [],
  }),
  {
    name: 'root',
    partialize: state => omit(state, ['loginModal']) as StoreTypes,
  }
);

const useStore = create(store);

const { setState, getState } = useStore;

export { getState, setState };

export default useStore;
