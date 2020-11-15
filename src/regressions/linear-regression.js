import * as math from 'mathjs';
import { getRSquared } from './calculate-r-squared';

export const getRegression = (x, y) => {
    //Get the mean values from x and y
    const mean = parseInt(x.length / 2);
    const mean_x = x[mean];
    const mean_y = y[mean];

    //Get x minues mean x values and y minus mean y values and x squared values
    let x_minus_mean_x = [];
    let y_minus_mean_y = [];
    let x_squared = [];

    for (let i = 0; i < x.length; i++) {
        x_minus_mean_x.push(x[i] - mean_x);
        y_minus_mean_y.push(y[i] - mean_y);
        x_squared.push(x_minus_mean_x[i]**2)
    }

    //multiply substractions
    let x_times_y = [];

    for (let i = 0; i < x.length; i++) {
        x_times_y.push(x_minus_mean_x[i] * y_minus_mean_y[i]);
    }

    //Calculate slope
    x_times_y = math.matrix(x_times_y);
    x_squared = math.matrix(x_squared);

    let x_squared_sum = math.sum(x_squared);
    let x_times_y_sum = math.sum(x_times_y);

    let slope = (x_times_y_sum / x_squared_sum);

    //Calculate intersection with y axis when x = 0
    let b = (mean_y - (slope * mean_x));

    let x_new = [...x];
    x_new.sort();

    //Calculate y hat values
    let y_new_sorted = [];
    let y_new = []
    for (let i = 0; i < x_new.length; i++) {
        y_new.push(parseFloat(b + ( slope * x[i] )))
        y_new_sorted.push(parseFloat(b + ( slope * x_new[i] )));
    }

    //Get R squared
    console.log(x, y, y_new)
    const r_squared = getRSquared(x, y, y_new);
    //format data
    const regression = {
        a: parseFloat(b).toFixed(3),
        b: parseFloat(slope).toFixed(3),
        r_squared,
        formula: `${parseFloat(b).toFixed(3)} + ${parseFloat(slope).toFixed(3)}x`
    };

    regression.dataset = y_new_sorted.map((currentY, index) => {
        return(
            {
                x: x_new[index],
                y: currentY
            }
        )
    });

    return regression;
}