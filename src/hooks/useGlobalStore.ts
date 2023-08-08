import useStore from "@/globalStore";

const useGlobalStore = () => {
  const store = useStore();

  return {
    ...store,
    setGlobalState: useStore.setState,
  };
};

export default useGlobalStore;
