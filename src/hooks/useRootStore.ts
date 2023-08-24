import useStore from "./rootStore";

const useRootStore = () => {
  const store = useStore();

  return {
    ...store,
    setGlobalState: useStore.setState,
  };
};

export default useRootStore;
