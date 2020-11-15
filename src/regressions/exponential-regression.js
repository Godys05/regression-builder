import * as math from 'mathjs';
import { getRSquared } from './calculate-r-squared';


export const getRegression = (x, y) => {
    let x_sorted = [...x];
    x_sorted.sort((a, b) => a-b);
    //Get X and Y
    let total_x = 0;
    let total_x_squared = 0;

    let total_lnY = 0;
    let total_XlnY = 0;

    for (let i = 0; i < x_sorted.length; i++) {
        //Sum current X and sum current X squared
        total_x += x[i];
        total_x_squared += x[i] ** 2;

        //Sum log current Y and log current Y times current X
        let currentY = math.log(y[i]);
        total_lnY += currentY;
        total_XlnY += currentY * x[i];
    }

    //Create matrices
    const x_matrix = math.matrix( [ [x_sorted.length, total_x], [total_x, total_x_squared] ] );
    const y_matrix = math.matrix( [ [total_lnY], [total_XlnY] ] );

    //Calculate W
    let w_matrix = math.inv(x_matrix);
    w_matrix = math.multiply(w_matrix, y_matrix);

    //Get a and b
    const a = (math.e ** math.subset(w_matrix, math.index(0, 0))).toFixed(3);
    const b = (math.subset(w_matrix, math.index(1, 0))).toFixed(3);

    //Calculate Y hat values
    let y_hat = [];
    for (let i = 0; i < x_sorted.length; i++) {
        y_hat.push( parseFloat(a * (math.e ** (b * x[i]) )) );
    }
     
    //Calculate values for plotting
    let x_plot = [];
    let y_plot = [];
    let epsilon = (1 / math.abs(x_sorted[x_sorted.length - 1] - x_sorted[0]));
    let counter = 0;
    if (x_sorted.length > 10 || x_sorted[x_sorted.length - 1] > 100) epsilon = 0.2
    for (let i = x_sorted[0]; i <= x_sorted[x_sorted.length - 1]; i += parseFloat(math.abs(x_sorted[x_sorted.length - 1] - x_sorted[0])*epsilon)) {
        x_plot.push(i);
        y_plot.push( parseFloat(a * (math.e ** (b * x_plot[counter]) )) );
        counter++;
    }

    //Get R squared
    const r_squared = getRSquared(x, y, y_hat);

    //Reshape plotting input
    const dataset = x_plot.map((currentX, index) => ({x: currentX, y: y_plot[index]}))

    //Build regression obj
    const regression = {
        a,
        b,
        formula: `${a} * e^(${b}x)`,
        r_squared,
        dataset
    };

    return regression;
}