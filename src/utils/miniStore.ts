import { useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";

const miniStore = (store) => {
  Object.keys(store).forEach((key) => {
    store[key] = {};
  });

  let handler = {
    get: (_target, key) => {
      console.log(key);

      return store[key];
    },
    set: function (target, prop, value) {
      // 在设置属性时执行的方法
      // console.log("set", prop, value);
      store[prop] = value; // 设置原始对象的属性值

      return true;
    },
  };

  return new Proxy(store, handler);
};

export default miniStore;
