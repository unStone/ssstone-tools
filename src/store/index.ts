import store from 'storejs';

export const getStoreData = (STORE_KEY: string) => () => {
  const data = store.get(STORE_KEY) || '{}';
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

export const setStoreData = (STORE_KEY: string) => (data = {}) => {
  const oldData = getStoreData(STORE_KEY)() || {};
  return store.set(STORE_KEY, { ...oldData, ...data });
};

class Store {
  private STORE_KEY: string;
  public getAllData: () => any;
  public setData: (data: any) => any;

  constructor(STORE_KEY: string) {
    this.STORE_KEY = STORE_KEY;
    this.getAllData = getStoreData(this.STORE_KEY);
    this.setData = setStoreData(this.STORE_KEY);
  }
  getData = (key: string) => this.getAllData()?.[key];
}

export default Store;