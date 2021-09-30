export const saveState = (state) => {
  const newState = { auth: state.auth, boards: state.boards?.list }
  localStorage.setItem("state", JSON.stringify(newState));
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
