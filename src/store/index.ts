import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";

//在localStorge中生成key为root的值
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["loginModal"], //设置某个reducer数据不持久化，
};

const myPersistReducer = persistReducer(persistConfig, reducers);

const store = createStore(myPersistReducer);

const persistor = persistStore(store);

export { store, persistor };
