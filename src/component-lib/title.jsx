import React from 'react';

export function Title(props) {
  // passed down
  const { title } = props;

  return <div className="welcome-title">{title}</div>;
}
