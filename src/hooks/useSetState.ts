import { useCallback, useState, useRef } from "react";
import { isFunction } from "@/utils";

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null)
) => void;

type getState = (getStateCallback: (arg: object, resolve: any) => void) => any;

const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S)
): [S, SetState<S>, getState] => {
  const [state, setState] = useState<S>(initialState);

  const stateRef = useRef(state);
  stateRef.current = state;

  const get = useCallback(() => stateRef.current, []);

  const getState: getState = (getStateCallback) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 当需要异步时调用resolve，不需要则不用
        getStateCallback(get(), resolve);
      });
    });
  };

  const setMergeState = useCallback((patch: any) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState, getState];
};

export default useSetState;
