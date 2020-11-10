import React from 'react';
import { useHistory } from 'react-router-dom';

import * as actions from '../redux/actions/actions';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const onNewRegressionClick = () => {
        dispatch(actions.addX());
        dispatch(actions.addY());
        dispatch(actions.addLabelX());
        dispatch(actions.addLabelY());
        dispatch(actions.addLinealRegression());
        dispatch(actions.addQuadraticRegression());
        dispatch(actions.addExponentialRegression());
        dispatch(actions.addLogarithmicRegression());
        dispatch(actions.addInterpolationRegression());
        history.push('/')
    }
    return(
        <div className="navbar">
            <p className={window.innerWidth >= 1000 ? 'header' : 'subheader bold' } >Results</p>
            <button className="button-large new-regression button-primary-outline" onClick={() => onNewRegressionClick()} >New regression</button>
        </div>
    )
}

export default Navbar;