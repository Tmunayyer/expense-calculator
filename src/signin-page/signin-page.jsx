import React from 'react';

import { PageWrapper, PageBody } from '../component-lib/pages.jsx';

const SignInButton = () => {
  return (
    <>
      <a className="link-as-button" href="/google/signin">
        <img
          className="google-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
        <span>Sign-in with Google</span>
      </a>
    </>
  );
};

const Title = () => {
  return <div className="sign-in-title">Expense Calculator</div>;
};

export function SigninPage(props) {
  return (
    <PageWrapper>
      <PageBody>
        <div className="sign-in-page-container">
          <Title />
          <SignInButton />
        </div>
      </PageBody>
    </PageWrapper>
  );
}
