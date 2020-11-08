import * as actions from './actionTypes';

export const addX = (value) => ({
    type: actions.ADD_X,
    payload: value
})

export const addY = (value) => ({
    type: actions.ADD_Y,
    payload: value
})

export const addLabelX = (name) => ({
    type: actions.ADD_X_LABEL,
    payload: name
})

export const addLabelY = (name) => ({
    type: actions.ADD_Y_LABEL,
    payload: name
})

export const addLinealRegression = (regression) => ({
    type: actions.ADD_LINEAL_R,
    payload: regression
})

export const addQuadraticRegression = (regression) => ({
    type: actions.ADD_QUADRATIC_R,
    payload: regression
})

export const addExponentialRegression = (regression) => ({
    type: actions.ADD_EXPONENTIAL_R,
    payload: regression
})

export const addLogarithmicRegression = (regression) => ({
    type: actions.ADD_LOG_R,
    payload: regression
})

export const addInterpolationRegression = (regression) => ({
    type: actions.ADD_INTERPOLATION_R,
    payload: regression
})

export const addPowerRegression = (regression) => ({
    type: actions.ADD_POWER_R,
    payload: regression  
})