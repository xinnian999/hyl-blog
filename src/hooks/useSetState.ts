import { useCallback, useState, useRef } from "react";
import { isFunction } from "@/utils";

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state:
    | Pick<S, K>
    | null
    | ((prevState: Readonly<S>) => Pick<S, K> | S | null | Promise<void>)
) => void;

type getState = (getStateCallback: (arg: object) => void) => any;

const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S)
): [S, SetState<S>, getState] => {
  const [state, setState] = useState<S>(initialState);

  const stateRef = useRef(state);

  stateRef.current = state;

  const getState: getState = (getStateCallback) => {
    setTimeout(() => {
      getStateCallback(stateRef.current);
    });
  };

  const setMergeState = useCallback((patch: any) => {
    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      const result = newState ? { ...prevState, ...newState } : prevState;
      return result;
    });
  }, []);

  return [state, setMergeState, getState];
};

export default useSetState;
