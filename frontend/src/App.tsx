import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'; // ✅ Fixed typo
import ContextProvider from './context/ContextProvider';

const App = () => {
  return (
    <ContextProvider>
      <Header />
      <div className="col-sm-12">
        <Outlet />
      </div>
    </ContextProvider>
  );
};

export default App;
