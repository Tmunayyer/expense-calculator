import { mapState } from '../state/interface';

export const [appSelector, appActions] = mapState('App', {
  initial: {
    user: null,
    loading: true,
    userState: 'calculating' // or finished
  },
  actions: {
    setLoading: (_store, result) => {
      return {
        ..._store,
        loading: false
      };
    },
    setUser: (_store, result) => {
      const newStoreObj = { ..._store };

      newStoreObj.user = result;

      return newStoreObj;
    },
    setUserState: (_store, result) => {
      return {
        ..._store,
        userState: result
      };
    }
  }
});
