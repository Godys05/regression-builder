import React, { useEffect, useState } from 'react';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import {
    addLinealRegression,
    addQuadraticRegression,
    addExponentialRegression,
    addPowerRegression,
    addLogarithmicRegression,
    addInterpolationRegression
 } from '../redux/actions/actions';

//Regressions
//Regressions
import * as linearR from '../regressions/linear-regression';
import * as quadraticR from '../regressions/quadratic-regression';
import * as exponentialR from '../regressions/exponential-regression';

import RegressionChart from '../Components/RegressionChart';
import Navbar from '../Components/Navbar';
import { pow } from 'mathjs';

const Results = () => {
    const dispatch = useDispatch();

    const [regressionsDone, setDone] = useState(null);
    const [linear, setLinear] = useState(null);
    const [quadratic, setQuadratic] = useState(null);
    const [exponential, setExponential] = useState(null);
    const [power, setPower] = useState(null);
    const [log, setLog] = useState(null);
    const [interpolation, setInterpolation] = useState(null);

    const labelX = useSelector(state => state.datasetReducer.labelX);
    const labelY = useSelector(state => state.datasetReducer.labelY);
    const x = useSelector(status => status.datasetReducer.x);
    const y = useSelector(status => status.datasetReducer.y);


    const scatterData = x.map((currentX, index) => {
        return ({
            x: currentX,
            y: y[index]
        })
    });

    const calculateRegressions = () => {
        let result = null;

        result = linearR.getRegression(x, y);
        dispatch(addLinealRegression(result));
        setLinear(result);

        result = quadraticR.getRegression(x, y);
        dispatch(addQuadraticRegression(result));
        setQuadratic(result);

        const x_fixed = x.map(currentX => currentX === 0 ? 0.00000001 : parseFloat(currentX));
        const y_fixed = y.map(currentY => currentY=== 0 ? 0.00000001 : parseFloat(currentY));

        result = exponentialR.getRegression(x_fixed, y_fixed);
        dispatch(addExponentialRegression(result));
        setExponential(result);

        setDone(true);
    }

    useEffect(() => {
        if (!regressionsDone) calculateRegressions();
    }, [regressionsDone])

    return(
        <div>
            {
                regressionsDone
                ?
                <div className="fullscreen">
                    <Navbar />
                    <RegressionChart
                    scatterData={scatterData}
                    labelX={labelX} labelY={labelY}
                    regression={linear}
                    regressionName="Linear regression" />
                    <RegressionChart
                    scatterData={scatterData}
                    labelX={labelX} labelY={labelY}
                    regression={quadratic}
                    regressionName="Quadratic regression" />
                    <RegressionChart
                    scatterData={scatterData}
                    labelX={labelX} labelY={labelY}
                    regression={exponential}
                    regressionName="Exponential regression" />
                </div>
                :
                null
            }
        </div>
    )
}

export default Results;