import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1>Multi-Page Form</h1>
      <Outlet />
    </div>
  );
};

export default App;
