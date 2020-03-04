import React from 'react';

export const PageWrapper = ({ children }) => {
  return <div className="page-wrapper">{children}</div>;
};

export const PageHeader = ({ children }) => {
  return <div className="page-header">{children}</div>;
};

export const PageBody = ({ children }) => {
  return <div className="page-body">{children}</div>;
};

export const PageFooter = ({ children }) => {
  return <div className="page-footer">{children}</div>;
};
