/* eslint-disable no-unused-vars */
import FetchImages from './FetchImages';
import { useState } from 'react';
export const App = () => {
  return (
    <div

    // style={{
    //   height: '100vh',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   // fontSize: 40,
    //   color: '#010101',
    // }}
    >
      <FetchImages query="dog" />
    </div>
  );
};
