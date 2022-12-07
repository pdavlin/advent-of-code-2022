import { useEffect } from "react";
import { useImmer } from "use-immer";
import { GlobalState } from "./useGlobalState";

const useLocalStorage = (storageKey: string, fallbackState: GlobalState) => {
  const [value, setValue] = useImmer<GlobalState>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(storageKey))
      : fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};

export default useLocalStorage;
