import React from 'react';
import { connect } from 'react-redux';

import { stateSelector } from '../state/interface.js';
import { appSelector, appActions } from './state.js';

import { SigninPage } from '../signin-page/signin-page.jsx';
import { CalculatorPage } from '../calculator-page/calculator-page.jsx';

export const App = connect(
  stateSelector({
    user: appSelector((store) => store.user)
  }),
  {
    setUser: appActions.setUser
  }
)(function(props) {
  const { user, setUser } = props;

  if (!user) {
    return <SigninPage />;
  }

  return <CalculatorPage />;
});
