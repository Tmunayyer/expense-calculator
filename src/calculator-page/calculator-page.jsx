import React from 'react';
import { connect } from 'react-redux';

import { stateSelector } from '../state/interface.js';
import { appSelector } from '../app/state.js';
import { calcSelector, calcActions } from './state.js';

import { PageWrapper, PageBody } from '../component-lib/pages.jsx';
import { ExpenseSlider } from './slider.jsx';

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

  return (
    <>
      <span>Your Salary</span>
      <input
        value={salary}
        onChange={(e) => {
          const { value } = e.target;

          if (isNumber(value)) {
            return setSalary(value);
          }
        }}
      />
      <span>Numbers Only</span>
    </>
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
    <>
      <div>Your Expense</div>
      <div>{expense}</div>
    </>
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
    <>
      <div>Your Savings</div>
      <div>{savings}</div>
    </>
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

        {/* save/reset button */}
      </PageBody>
    </PageWrapper>
  );
});
