import { createContext, useContext } from "react";
import { Updater } from "use-immer";
import useLocalStorage from "./useLocalStorage";

export type GlobalState = {
  cookie: string;
};

export const initialState: GlobalState = {
  cookie: "",
};

const GlobalStateContext = createContext(initialState);
const GlobalStateDispatchContext = createContext<Updater<GlobalState>>(undefined);

// Add displayName values only to have clearer component names when using the react devtools.
GlobalStateContext.displayName = "GlobalStateContext";
GlobalStateDispatchContext.displayName = "GlobalStateDispatchContext";

/**
 * Global application state Provider components.
 */
export function GlobalStateProvider({ children }) {
  // We use Immer in a useState hook fashion within useLocalStorage Hook to make deep immutable state changes using its update function to update state with mutable patterns (the update Fn is named "dispatch" below).
  // Reference: https://immerjs.github.io/immer/example-setstate | https://immerjs.github.io/immer/typescript
  const [state, dispatch] = useLocalStorage("advent-state", initialState);

  return (
    <GlobalStateContext.Provider value={state as GlobalState}>
      <GlobalStateDispatchContext.Provider value={dispatch as Updater<GlobalState>}>
        {children}
      </GlobalStateDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}

/**
 * Anscillary internal hook to call useContext, retrieve the context, and avoid extra useContext() calls throughout the app.
 */
function useGlobalStateContext() {
  const context = useContext(GlobalStateContext);
  return context;
}

/**
 * Anscillary internal hook to call useContext, retrieve the context, and avoid extra useContext() calls throughout the app.
 * Also includes a safegaurd to throw an error if called above the Provider in the component tree.
 */
function useGlobalStateDispatch() {
  const context = useContext(GlobalStateDispatchContext);
  if (!context) {
    throw new Error(
      `useGlobalStateDispatch must be used within a GlobalStateDispatchContext Provider. context: ${context}`,
    );
  }
  return context;
}

/**
 * The main hook to useContext within components to access global application state, and to dispatch state changes.
 * @example const [state, dispatch] = useGlobalState();
 */
export default function useGlobalState(): [GlobalState, Updater<GlobalState>] {
  return [useGlobalStateContext(), useGlobalStateDispatch()];
}
