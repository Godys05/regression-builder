import React from 'react';
import { Route } from 'react-router-dom';

const NavigateBack = ({children}) => (
    <Route render={({history}) => (
        <div onClick={() => history.goBack()}>
            {children}
        </div>
    )} />
)

export default NavigateBack;