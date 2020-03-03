import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

export const SigninPage = connect(
  null,
  null
)(function(props) {
  const handleSignIn = () => {};
  return <a href="/google/signin">SigninPage</a>;
});
