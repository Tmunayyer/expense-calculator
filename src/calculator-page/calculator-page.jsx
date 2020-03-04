import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { stateSelector } from '../state/interface.js';
import { appSelector } from '../app/state.js';
import { calcSelector, calcActions } from './state.js';

import { PageWrapper, PageBody } from '../component-lib/pages.jsx';
import { WelcomeTitle } from '../component-lib/title.jsx';
import { LabelAndValue } from '../component-lib/label-and-value.jsx';
import { Button } from '../component-lib/button.jsx';
import { ExpenseSlider } from './slider.jsx';

/**
 * Takes in the number and produces a currency formatted
 *  string for display.
 *
 * @param {*} num
 */
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

export const CalculatorPage = connect(
  stateSelector({
    user: appSelector((store) => store.user),
    slider: calcSelector((store) => store.slider),
    salary: calcSelector((store) => store.salary),
    expense: calcSelector((store) => store.expense),
    savings: calcSelector((store) => store.savings)
  }),
  { reset: calcActions.reset, setFinished: calcActions.setFinished }
)(function(props) {
  // props
  const { user, expense, savings, slider, salary } = props;

  // actions
  const { reset } = props;

  const save = async (payload) => {
    const URI = '/api/calculator-data';

    const { message } = await axios({
      method: 'post',
      url: URI,
      headers: {
        'Content-Type': 'application/json'
      },
      params: payload
    });

    if (message === 'success') {
      setFinished(true);
    }
  };

  return (
    <PageWrapper>
      <PageBody>
        <WelcomeTitle
          title={`Welcome to your monthly budget ${user.first_name}.`}
        />

        <ExpenseSlider />
        <SalaryInput />

        <LabelAndValue
          label={'Your Expense'}
          value={`$${formatCurrency(expense.toFixed(2))}`}
        />
        <LabelAndValue
          highlight={true}
          label={'Your Savings'}
          value={`$${formatCurrency(savings.toFixed(2))}`}
        />

        <div className="calculator-actions">
          <Button text={'reset'} nonPreferred={true} onClick={reset} />
          <Button
            text={'save'}
            onClick={() =>
              save({
                slider,
                salary
              })
            }
          />
        </div>
      </PageBody>
    </PageWrapper>
  );
});
