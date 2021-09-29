export const saveState = (state) => {
  localStorage.setItem("state", JSON.stringify(state));
};

export const loadState = () => {
  const serializedState = localStorage.getItem("state") || "{}";
  return JSON.parse(serializedState);
};

export const storePlugin = (store) => {
  store.subscribe((_, state) => {
    saveState(state);
  });
};
