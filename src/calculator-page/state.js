import { mapState } from '../state/interface';

export const [calcSelector, calcActions] = mapState('Calculator', {
  initial: {
    slider: 0.05,
    salary: 0
  },
  actions: {
    setSlider: (_store, result) => {
      return {
        ..._store,
        slider: result
      };
    },
    setSalary: (_store, result) => {
      return {
        ..._store,
        salary: result
      };
    },
    testing: (_store, result) => {
      return {
        ..._store
      };
    }
  }
});
