import { useCallback, useState, useRef, useEffect } from "react";
import { isFunction } from "@/utils";

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state:
    | Pick<S, K>
    | null
    | ((prevState: Readonly<S>) => Pick<S, K> | S | null | Promise<void>),
  callback?: () => void
) => void;

const useSetState = <S extends Record<string, any>>(
  initialState: S | (() => S)
): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initialState);

  const stateRef: any = useRef();

  useEffect(() => {
    stateRef.current && stateRef.current(state);
  }, [state]);

  const setMergeState = useCallback((patch, callback) => {
    if (callback) {
      stateRef.current = callback;
    }

    setState((prevState) => {
      const newState = isFunction(patch) ? patch(prevState) : patch;
      const result = newState ? { ...prevState, ...newState } : prevState;
      return result;
    });
  }, []);

  return [state, setMergeState];
};

export default useSetState;
