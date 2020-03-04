import { mapState } from '../state/interface';

export const [appSelector, appActions] = mapState('App', {
  initial: {
    user: null,
    loading: true
  },
  actions: {
    setLoading: (store, result) => {
      return {
        ...store,
        loading: false
      };
    },
    setUser: (store, result) => {
      const newStoreObj = { ...store };

      newStoreObj.user = result;

      return newStoreObj;
    }
  }
});
