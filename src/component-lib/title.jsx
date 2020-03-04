import React from 'react';

export function WelcomeTitle(props) {
  // passed down
  const { title } = props;

  return <div className="welcome-title">{title}</div>;
}
