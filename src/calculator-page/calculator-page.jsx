import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { stateSelector } from '../state/interface.js';
import { appSelector } from '../app/state.js';
import { calcSelector, calcActions } from './state.js';

import { PageWrapper, PageBody } from '../component-lib/pages.jsx';
import { ExpenseSlider } from './slider.jsx';

const formatCurrency = (num) => {
  const str = num.toString();

  let output = '';

  // every 3 chars add a ,
  let count = 0;

  for (let i = str.length - 1; i >= 0; i--) {
    const char = str[i];

    output = char + output;
    count++;

    if (char === '.') {
      count = 0;
    }

    if (count === 3 && i !== 0) {
      output = ',' + output;
      count = 0;
    }
  }

  return output;
};

/**
 * Validation to ensure the input is in fact a number. We cant
 *  rely on parseInt alone since 100abc will return 100.
 *
 * @param {string} string
 */
const isNumber = (string) => {
  for (let i = 0; i < string.length; i++) {
    // account for decimal
    if (string[i] === '.') continue;

    const num = parseInt(string[i]);
    if (isNaN(num)) {
      return false;
    }
  }
  return true;
};

const WelcomeTitle = connect(
  stateSelector({
    user: appSelector((store) => store.user)
  }),
  null
)(function WelcomeTitle(props) {
  const { user } = props;

  return (
    <div className="welcome-title">{`Welcome to your monthly budget ${user.first_name}.`}</div>
  );
});

const SalaryInput = connect(
  stateSelector({
    salary: calcSelector((store) => store.salary)
  }),
  {
    setSalary: calcActions.setSalary
  }
)(function SalaryInput(props) {
  // props
  const { salary } = props;

  // actions
  const { setSalary } = props;

  let displaySalary = salary;
  if (displaySalary === 0) {
    displaySalary = '';
  }

  return (
    <div className="calculator-row">
      <div>Your Salary</div>
      <input
        className="calculator-input"
        type="text"
        value={displaySalary}
        placeholder={'100000'}
        onChange={(e) => {
          const { value } = e.target;

          if (isNumber(value)) {
            return setSalary(value);
          }
        }}
      />
    </div>
  );
});

const Expense = connect(
  stateSelector({
    expense: calcSelector((store) => store.expense)
  }),
  null
)(function Expense(props) {
  const { expense } = props;

  return (
    <div className="calculator-row">
      <div>Your Expense</div>
      <div>${formatCurrency(expense.toFixed(2))}</div>
    </div>
  );
});

const Savings = connect(
  stateSelector({
    savings: calcSelector((store) => store.savings)
  }),
  null
)(function Savings(props) {
  const { savings } = props;

  return (
    <div className="calculator-row highlight-row">
      <div>Your Savings</div>
      <div>${formatCurrency(savings.toFixed(2))}</div>
    </div>
  );
});

const ResetButton = connect(
  null,
  { reset: calcActions.reset }
)(function ResetButton(props) {
  //actions
  const { reset } = props;

  return <button onClick={reset}>Reset</button>;
});

const SaveButton = connect(
  stateSelector({
    slider: calcSelector((store) => store.slider),
    salary: calcSelector((store) => store.salary)
  }),
  null
)(function SaveButton(props) {
  // props
  const { slider, salary } = props;

  const save = async (payload) => {
    const URI = '/api/calculator-data';

    const response = await axios({
      method: 'post',
      url: URI,
      headers: {
        'Content-Type': 'application/json'
      },
      params: payload
    });
  };

  return (
    <button
      onClick={() =>
        save({
          slider,
          salary
        })
      }
    >
      Save
    </button>
  );
});

export const CalculatorPage = connect(
  null,
  null
)(function(props) {
  return (
    <PageWrapper>
      <PageBody>
        <WelcomeTitle />

        <ExpenseSlider />
        <SalaryInput />
        <Expense />
        <Savings />

        <ResetButton />
        <SaveButton />
      </PageBody>
    </PageWrapper>
  );
});
