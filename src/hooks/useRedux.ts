import { useSelector, useDispatch } from "react-redux";

type dispatchAction = { type: dispatchTypes; payload: any };

type dispatchFn = (action: dispatchAction) => void;

type batchDispatch = (dispatchData: dispatchAction[]) => void;

type useReduxResult = {
  store: storeTypes;
  dispatch: (action: dispatchAction) => void;
  batchDispatch: batchDispatch;
};

const useRedux = (): useReduxResult => {
  const store = useSelector((state: storeTypes) => state);
  const dispatch = useDispatch<dispatchFn>();

  const batchDispatch: batchDispatch = (dispatchData) => {
    dispatchData.forEach((item) => {
      dispatch(item);
    });
  };

  return { store, dispatch, batchDispatch };
};

export default useRedux;
