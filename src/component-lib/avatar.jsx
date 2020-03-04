import React from 'react';

export function Avatar(props) {
  const { src, name } = props;

  return (
    <div className="avatar-container">
      <div className="avatar">
        <img className="avatar-image" src={src} />
      </div>
      <div className="avatar-name">{name}</div>
    </div>
  );
}
