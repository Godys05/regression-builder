import * as math from 'mathjs';

export const getRSquared = (x_data, y_data, y_hat_data) => {
    //Get mean Y
    const mean = parseInt( x_data.length / 2 );
    const mean_y = y_data[mean];

    let y_difference = [];
    let y_hat_difference = [];
    let y_squared_difference = [];
    let y_hat_squared_difference = [];
    for (let i = 0; i < y_data.length; i++) {
        //Get actual y difference to the mean
        y_difference.push(y_data[i] - mean_y);
        //Get squared of above
        y_squared_difference.push(y_difference[i] ** 2)
        //Get y hat difference to the mean
        y_hat_difference.push(y_hat_data[i] - mean_y);
        //Get squared of above
        y_hat_squared_difference.push(y_hat_difference[i] ** 2);
    }
    //Get squared y and y hat sums
    y_difference = math.matrix(y_difference);
    y_hat_difference = math.matrix(y_hat_difference);

    const y_sum = math.sum(y_squared_difference);
    const y_hat_sum = math.sum(y_hat_squared_difference);

    //Get R squared
    const r_squared = (y_hat_sum / y_sum).toFixed(3) ;
    return r_squared;
}