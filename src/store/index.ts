import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";

const blacklist = ["setModal", "loginModal", "searchDrawer"]; //无需持久化的数据

const persistConfig = {
  key: "root", //在localStorge中生成key为root的值
  storage,
  // 过滤器函数
  stateReconciler: (inboundState, originalState) => {
    Object.keys(inboundState).forEach((reducer) => {
      Object.keys(inboundState[reducer]).forEach((key) => {
        if (blacklist.includes(key)) {
          inboundState[reducer][key] = originalState[reducer][key];
        }
      });
    });

    return inboundState;
  },
};

const myPersistReducer = persistReducer(persistConfig, reducers);

const store = createStore(myPersistReducer);

const persistor = persistStore(store);

export { store, persistor };
