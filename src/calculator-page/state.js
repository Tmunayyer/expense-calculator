import { mapState } from '../state/interface';

const calculateExpense = (salary, percentage) => {
  const expense = Math.trunc((salary / 12) * percentage * 100) / 100;

  return expense;
};

const calculateSavings = (salary, percentage) => {
  const savings = Math.trunc((salary / 12) * (1 - percentage) * 100) / 100;

  return savings;
};

export const [calcSelector, calcActions] = mapState('Calculator', {
  initial: {
    slider: 0.15,
    salary: 0,
    expense: 0,
    savings: 0
  },
  actions: {
    setSlider: (_store, result) => {
      const newStoreObj = { ..._store, slider: result };

      const { salary, slider } = newStoreObj;

      const expense = calculateExpense(salary, slider);
      const savings = calculateSavings(salary, slider);

      newStoreObj.expense = expense;
      newStoreObj.savings = savings;

      return newStoreObj;
    },
    setSalary: (_store, result) => {
      const newStoreObj = { ..._store, salary: result };

      const { salary, slider } = newStoreObj;

      const expense = calculateExpense(salary, slider);
      const savings = calculateSavings(salary, slider);

      newStoreObj.expense = expense;
      newStoreObj.savings = savings;

      return newStoreObj;
    },
    reset: (_store) => {
      return {
        ..._store,
        slider: 0.15,
        salary: 0,
        expense: 0,
        savings: 0
      };
    }
  }
});
