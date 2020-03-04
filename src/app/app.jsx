import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import { stateSelector } from '../state/interface.js';
import { appSelector, appActions } from './state.js';
import { calcActions } from '../calculator-page/state.js';

import { SigninPage } from '../signin-page/signin-page.jsx';
import { CalculatorPage } from '../calculator-page/calculator-page.jsx';
import { SummaryPage } from '../summary-page/summary-page.jsx';

export const App = connect(
  stateSelector({
    loading: appSelector((store) => store.loading),
    user: appSelector((store) => store.user),
    userState: appSelector((store) => store.userState)
  }),
  {
    setUser: appActions.setUser,
    setLoading: appActions.setLoading,
    loadCalcData: calcActions.loadData
  }
)(function App(props) {
  // props
  const { loading, user, userState } = props;

  // actions
  const { setUser, setLoading, loadCalcData } = props;

  console.log('the userState:', userState);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userURI = '/api/user';
        const { data: user } = await axios.get(userURI);
        setUser(user.data);

        if (user.message === 'success') {
          // we have a user, pre-emptively grab potential calculator data
          const calcDataURI = '/api/calculator-data';
          const { data: calculator } = await axios.get(calcDataURI);

          loadCalcData(calculator.data);
        }

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

  if (userState === 'finished') {
    return <SummaryPage />;
  }

  return <CalculatorPage />;
});
