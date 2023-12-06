import useStore from "@/rootStore";

const useRootStore = () => {
  const store = useStore();

  return {
    ...store,
    setRootState: useStore.setState,
  };
};

export default useRootStore;
