import { useEffect } from "react";

export default function useMount(func: Function) {
  useEffect(() => func(), []);
}
