import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

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

  async function fetchUser() {
    try {
      const uri = '/api/user';
      const { data } = await axios.get(uri);

      setUser(data.data);
    } catch (err) {
      console.log('ERROR: fetching user...', err);
      return null;
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <SigninPage />;
  }

  return <CalculatorPage />;
});
