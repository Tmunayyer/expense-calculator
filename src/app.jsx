import React from 'react';
import { connect } from 'react-redux';

import { stateSelector } from './state/interface.js';
import { appSelector, appActions } from './app-state.js';

export const _App = (props) => {
  const { count, setCount } = props;

  return (
    <div>
      <div>{`the count: ${count}`}</div>
      <button onClick={() => setCount(count + 1)}>count</button>
    </div>
  );
};

export const App = connect(
  stateSelector({
    count: appSelector((store) => store.count)
  }),
  {
    setCount: appActions.setCount
  }
)(_App);
