import { mapState } from '../state/interface';

export const [appSelector, appActions] = mapState('App', {
  initial: {
    user: null
  },
  actions: {
    setUser: (store, result) => {
      const newStoreObj = { ...store };

      newStoreObj.user = result;

      return newStoreObj;
    }
  }
});
