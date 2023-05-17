import { useSelector, useDispatch } from "react-redux";

type batchDispatch = (dispatchData: { type: string; payload: any }[]) => void;

type useReduxResult = {
  store: isStore;
  dispatch: (props: object) => void;
  batchDispatch: batchDispatch;
};

const useRedux = (): useReduxResult => {
  const store = useSelector((state: isStore) => state);
  const dispatch = useDispatch();

  const batchDispatch: batchDispatch = (dispatchData) => {
    dispatchData.forEach((item) => {
      dispatch(item);
    });
  };

  return { store, dispatch, batchDispatch };
};

export default useRedux;
