import React from 'react';

export function LabelAndValue(props) {
  const { highlight, label, value } = props;

  let className = 'calculator-row';
  if (highlight) {
    className += ' highlight';
  }

  return (
    <div className={className}>
      <div>{label}</div>
      <div>{value}</div>
    </div>
  );
}
