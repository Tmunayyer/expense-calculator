import React, { useState } from 'react';

export const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>{`the count: ${count}`}</div>
      <button onClick={() => setCount(count + 1)}>count</button>
    </div>
  );
};
