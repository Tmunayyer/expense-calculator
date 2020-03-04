import { mapState } from '../state/interface';

export const [calcSelector, calcActions] = mapState('Calculator', {
  initial: {
    slider: 15
  },
  actions: {
    setSlider: (store, result) => {
      return {
        ...store,
        slider: result
      };
    }
  }
});
