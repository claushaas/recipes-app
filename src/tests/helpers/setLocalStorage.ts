const setLocalStorage = (id: string, data: any) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

export default setLocalStorage;
