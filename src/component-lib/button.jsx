import React from 'react';

export function Button(props) {
  //actions
  const { nonPreferred, onClick, text } = props;

  let className = 'calculator-button';
  if (nonPreferred) {
    className += ' reset';
  }

  let clickHandler = onClick;
  if (typeof clickHandler !== 'function') {
    clickHandler = () => {};
  }

  return (
    <button className={className} onClick={clickHandler}>
      {text}
    </button>
  );
}
