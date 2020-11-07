import React from 'react';
import { Route } from 'react-router-dom';

const NavigateFordward = ({children, route}) => (
    <Route render={({ history}) => (
      <div onClick={() => history.push(route)}>
          {children}
      </div>
    )} />
  )
  export default NavigateFordward;