import React from 'react';
import { connect } from 'react-redux';

import { stateSelector } from '../state/interface.js';
import { appSelector, appActions } from '../app/state.js';
import { calcSelector } from '../calculator-page/state.js';

import { PageWrapper, PageHeader, PageBody } from '../component-lib/pages.jsx';
import { Avatar } from '../component-lib/avatar.jsx';
import { Title } from '../component-lib/title.jsx';
import { LabelAndValue } from '../component-lib/label-and-value.jsx';
import { Button } from '../component-lib/button.jsx';

import { formatCurrency } from '../helpers/format-currency.js';

export const SummaryPage = connect(
  stateSelector({
    user: appSelector((store) => store.user),
    election: calcSelector((store) => store.slider),
    salary: calcSelector((store) => store.salary),
    expense: calcSelector((store) => store.expense),
    savings: calcSelector((store) => store.savings)
  }),
  { setUserState: appActions.setUserState }
)(function SummaryPage(props) {
  // props
  const { user, election, salary, expense, savings } = props;

  // actions
  const { setUserState } = props;

  return (
    <PageWrapper>
      <PageHeader>
        <Avatar src={user.avatar} name={user.full_name} />
      </PageHeader>

      <PageBody>
        <Title title={`Thank you ${user.first_name}.`} />

        <LabelAndValue label={'Your Election'} value={`${election * 100}%`} />
        <LabelAndValue
          label={'Your Salary'}
          value={`$${formatCurrency(parseInt(salary).toFixed(2))}`}
        />
        <LabelAndValue
          label={'Your Expense'}
          value={`$${formatCurrency(expense.toFixed(2))}`}
        />
        <LabelAndValue
          highlight={true}
          label={'Your Savings'}
          value={`$${formatCurrency(savings.toFixed(2))}`}
        />

        <div className="summary-actions">
          <Button
            text={'recalculate'}
            nonPreferred={true}
            onClick={() => {
              setUserState('calculating');
            }}
          />
        </div>
      </PageBody>
    </PageWrapper>
  );
});
