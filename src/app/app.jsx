import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { stateSelector } from '../state/interface.js';
import { appSelector, appActions } from './state.js';

import { SigninPage } from '../signin-page/signin-page.jsx';
import { CalculatorPage } from '../calculator-page/calculator-page.jsx';

export const App = connect(
  stateSelector({
    loading: appSelector((store) => store.loading),
    user: appSelector((store) => store.user)
  }),
  {
    setUser: appActions.setUser,
    setLoading: appActions.setLoading
  }
)(function App(props) {
  // props
  const { loading, user } = props;

  // actions
  const { setUser, setLoading } = props;

  useEffect(() => {
    async function fetchUser() {
      try {
        const uri = '/api/user';
        const { data } = await axios.get(uri);

        setUser(data.data);
        setLoading(false);
      } catch (err) {
        console.log('ERROR: fetching user...', err);
        return null;
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return null;
  }

  if (!user) {
    return <SigninPage />;
  }

  return <CalculatorPage />;
});
