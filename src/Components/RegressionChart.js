/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';

//Regressions
import * as linear from '../regressions/linear-regression';

const RegressionChart = ({scatterData, labelX, labelY, regression, regressionName, bestFit}) => {
    let chart = null;

    const [ctx, setContext] = useState(null);

    const dotWidth = window.innerWidth <= 600 ? 3 : 6;
    const fontSize = window.innerWidth <= 600 ? 10 : 14;
    const lineWidth = window.innerWidth <= 600 ? 1 : 2;

    if (ctx) {
        var gradient = ctx.createLinearGradient(0,0,700,0);
        gradient.addColorStop(0, 'rgba(81, 199, 167, 0.6)');
        gradient.addColorStop(0.5, 'rgba(76, 205, 170, 0.6)');
        gradient.addColorStop(1, 'rgba(68, 213, 174, 0.6)');

        chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Scatter Dataset',
                    data: scatterData,
                    backgroundColor: '#5ABEF9',
                    pointRadius: dotWidth,
                    pointHitRadius: dotWidth
                }, {
                    label: 'Line Dataset',
                    data: regression.dataset,
                    type: 'line',
                    backgroundColor: gradient,
                    fill: false,
                    borderColor: gradient,
                    pointHoverBorderColor: gradient,
                    pointRadius: dotWidth - 2,
                    pointHitRadius: dotWidth - 2,
                    borderWidth: dotWidth - 2
                }],
                labels: ['January', 'February', 'March', 'April'],
            },
            options: {
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        labelTextColor: function(tooltipItem, chart) {
                            return '#f1f1f1';
                        }
                    },
                    backgroundColor: '#33305C',
                    position: 'average',
                    bodyFontSize: fontSize
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: 'rgba(#473F79, 0.6)',
                            lineWidth: lineWidth,
                            zeroLineColor: 'rgba(#473F79, 0.6)',
                            zeroLineWidth: lineWidth
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            fontFamily: "'Montserrat', sans-serif",
                            labelString: labelX,
                            fontColor:'#f1f1f1',
                            fontSize: fontSize + 2
                        },
                        ticks: {
                        fontColor: '#f1f1f1',
                        fontSize: fontSize
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(#473F79, 0.6)',
                            lineWidth: lineWidth,
                            zeroLineColor: 'rgba(#473F79, 0.6)',
                            zeroLineWidth: lineWidth
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            fontFamily: "'Montserrat', sans-serif",
                            labelString: labelY,
                            fontColor: '#f1f1f1',
                            fontSize: fontSize + 2
                        },
                        ticks: {
                            fontColor: '#f1f1f1',
                            fontSize: fontSize
                        }
                    }]
                }
            }
        });
    }

    useEffect(() => {
        console.log(regression)
        if (!ctx) setContext(document.getElementById(regressionName).getContext('2d'))
        return (() => chart !== null ? chart.destroy() : chart)
    }, [chart, ctx])

    return(
        <div className="under-navbar">
            <p className="subheader bold margin-left"> {regressionName} </p>
            <div className="center">
                <div className="card chart">
                    <canvas id={regressionName} ></canvas>
                </div>
            </div>
            <p className="subheader margin-left"><span className="bold">R squared: </span>{regression.r_squared}</p>
            <p className="subheader margin-left"><span className="bold">Model: </span>{regression.formula}</p>
        </div>
    )
}

export default RegressionChart;