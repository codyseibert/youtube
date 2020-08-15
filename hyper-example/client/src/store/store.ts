import { cloneDeep } from "lodash";
import { createInitialState } from "./state";

const deepFreeze = (obj) => {
  Object.keys(obj).forEach((prop) => {
    if (obj[prop] === "object" && !Object.isFrozen(obj[prop]))
      deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};

export const createStore = ({ onStateUpdated }) => {
  const state = createInitialState();

  const getState = () => deepFreeze(cloneDeep(state));

  const setState = (newState) => {
    Object.assign(state, newState);
    onStateUpdated({
      setState,
      getState,
    });
  };

  return {
    setState,
    getState,
  };
};
