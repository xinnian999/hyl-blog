import { isStore } from "@/config/store";
import { useSelector, useDispatch } from "react-redux";

type dispatchAll = (dispatchData: { type: string; payload: any }[]) => void;

type useReduxResult = {
  store: isStore;
  dispatch: (props: object) => void;
  dispatchAll: dispatchAll;
};

const useRedux = (): useReduxResult => {
  const store = useSelector((state: isStore) => state);
  const dispatch = useDispatch();

  const dispatchAll: dispatchAll = (dispatchData) => {
    dispatchData.forEach((item) => {
      dispatch(item);
    });
  };

  return { store, dispatch, dispatchAll };
};

export default useRedux;
