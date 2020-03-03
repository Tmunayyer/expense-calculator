import { mapState } from '../state/interface';

export const [appSelector, appActions] = mapState('App', {
  initial: {
    count: 0
  },
  actions: {
    setCount: (store, result) => {
      const newStoreObj = { ...store };

      newStoreObj.count = result;

      return newStoreObj;
    }
  }
});
