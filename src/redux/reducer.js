import * as actionTypes from './actions/actionTypes';

export const datasetReducer = (state = [], action) => {
    if (action.type === actionTypes.ADD_X) {
        return {...state, x: action.payload};
    }
    else if (action.type === actionTypes.ADD_Y) {
        return {...state, y: action.payload}
    }
    else if (action.type === actionTypes.ADD_X_LABEL) {
        return {...state, labelX: action.payload}
    }
    else if (action.type === actionTypes.ADD_Y_LABEL) {
        return {...state, labelY: action.payload}
    }
    else return state;
}

export const regressionReducer = (state = {}, action) => {
    if (action.type === actionTypes.ADD_LINEAL_R) {
        let newState = Object.assign({}, state);
        newState.linearRegression = action.payload;
        return newState;
    }
    else if (action.type === actionTypes.ADD_QUADRATIC_R) {
        let newState = Object.assign({}, state);
        newState.quadraticRegression = action.payload;
        return newState;
    }
    else if (action.type === actionTypes.ADD_EXPONENTIAL_R) {
        let newState = Object.assign({}, state);
        newState.exponentialRegression = action.payload;
        return newState;
    }
    else if (action.type === actionTypes.ADD_LOG_R) {
        let newState = Object.assign({}, state);
        newState.logarithmicRegression = action.payload;
        return newState;
    }
    else if (action.type === actionTypes.ADD_POWER_R) {
        let newState = Object.assign({}, state);
        newState.powerRegression = action.payload;
        return newState;
    }
    else if (action.type === actionTypes.ADD_INTERPOLATION_R) {
        let newState = Object.assign({}, state);
        newState.interpolation = action.payload;
        return newState;
    }
    else return state;
}