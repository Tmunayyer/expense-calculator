import React from 'react';
import { connect } from 'react-redux';

import { setCount } from './state/actions';

export const _App = (props) => {
  const { count, setCount } = props;

  return (
    <div>
      <div>{`the count: ${count}`}</div>
      <button onClick={() => setCount(count + 1)}>count</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    count: state.counter.count
  };
};

const mapDispatchToProps = { setCount };

export const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(_App);
