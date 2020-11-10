import * as math from 'mathjs';
import { getRSquared } from './calculate-r-squared';

export const getRegression = (x, y) => {
    const data_size = x.length;

    //Choose regression grade
    const base = 2;

    //Set the right shape for X matrix
    let X = math.zeros(data_size, base + 1);
    //Fill X matrix with the right values
    const rows = data_size;
    const cols = base + 1;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            X.subset(math.index(j, i), x[j] ** i) ;
        }
    }

    //Calculate W
    const Xt = math.transpose(X);
    console.log(X)
    console.log(Xt)
    const Xt_times_X = math.multiply( Xt, X );
    const X_inverse = math.inv(Xt_times_X);
    const X_final = math.multiply( X_inverse, Xt );

    let Y = math.matrix(y);
    Y = math.reshape(Y, [data_size, 1]);
    const W = math.multiply( X_final, Y );
    console.log(W)
    let X_sorted = [...x];
    X_sorted.sort((a, b) => a - b);
    console.log(X_sorted)
    let x_new = [];
    let epsilon = (1/(math.abs(X_sorted[X_sorted.length - 1] - X_sorted[0])))
    if (X_sorted.length > 10 || X_sorted[0] > 100) epsilon = 0.2
    for (let i = X_sorted[0]; i <= X_sorted[X_sorted.length -1]; i+=(parseInt( (X_sorted[X_sorted.length -1] - X_sorted[0]) * epsilon))) x_new.push(i);
    
    //Calculate new Y
    let Y_new = [];
    let Y_new_sorted = []
    for (let i = 0; i < x_new.length; i++) {
        let currentY = 0
        for (let j = 0; j < (base + 1); j++) {
            currentY += (W._data[j] * (x_new[i] ** j));
        }
        Y_new_sorted.push(currentY);
    }

    for (let i = 0; i < x.length; i++) {
        let currentY = 0
        for (let j = 0; j < (base + 1); j++) {
            currentY += (W._data[j] * (x[i] ** j));
        }
        console.log('CURRENT NEW Y sorted')
        Y_new.push(currentY);
    }

    let r_squared = getRSquared(x, y, Y_new);
    
    const regression = {
        a: W._data[2],
        b: W._data[1],
        c: W._data[0],
        r_squared,
        formula: `${W._data[2]}x^2 + ${W._data[1]}x + ${W._data[0]}`
    }

    regression.dataset = Y_new_sorted.map((currentY, index) => {
        return(
            {
                x: x_new[index],
                y: currentY
            }
        )
    });

    return regression;
}