import React from 'react';
import { connect } from 'react-redux';

import { stateSelector } from '../state/interface.js';
import { appSelector } from '../app/state.js';

import { PageWrapper, PageBody } from '../component-lib/pages.jsx';

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

export const CalculatorPage = connect(
  null,
  null
)(function(props) {
  return (
    <PageWrapper>
      <PageBody>
        <WelcomeTitle />
        {/* slider */}
        {/* input salary */}
        {/* expense calc */}
        {/* saving calc */}

        {/* save/reset button */}
      </PageBody>
    </PageWrapper>
  );
});
