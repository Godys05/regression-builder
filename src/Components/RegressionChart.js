/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';

//Regressions
import * as linear from '../regressions/linear-regression';

const RegressionChart = ({scatterData, labelX, labelY, regression, regressionName, bestFit}) => {
    let chart = null;

    const createChart = () => {
        const ctx = document.getElementById(regressionName).getContext('2d');

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
                    pointRadius: 8,
                    pointHitRadius: 8
                }, {
                    label: 'Line Dataset',
                    data: regression.dataset,
                    type: 'line',
                    backgroundColor: gradient,
                    fill: false,
                    borderColor: gradient,
                    pointHoverBorderColor: gradient,
                    pointRadius: 6,
                    pointHitRadius: 6,
                    borderWidth: 6
                }],
                labels: ['January', 'February', 'March', 'April']
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
                    bodyFontSize: 14
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: 'rgba(#473F79, 0.6)',
                            lineWidth: 2,
                            zeroLineColor: 'rgba(#473F79, 0.6)',
                            zeroLineWidth: 2
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            fontFamily: "'Montserrat', sans-serif",
                            labelString: labelX,
                            fontColor:'#f1f1f1',
                            fontSize:18
                        },
                        ticks: {
                           fontColor: '#f1f1f1',
                           fontSize: 14
                          }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: 'rgba(#473F79, 0.6)',
                            lineWidth: 2,
                            zeroLineColor: 'rgba(#473F79, 0.6)',
                            zeroLineWidth: 2
                        },
                        display: true,
                        scaleLabel: {
                            display: true,
                            fontFamily: "'Montserrat', sans-serif",
                            labelString: labelY,
                            fontColor: '#f1f1f1',
                            fontSize:18
                        },
                        ticks: {
                              fontColor: '#f1f1f1',
                              fontSize: 14
                        }
                    }]
                }
            }
        });
        chart.render();
    }

    useEffect(() => {
        console.log(regression)
        createChart();
        return (() => chart !== null ? chart.destroy() : chart)
    }, [])

    return(
        <div className="container margin-top">
            <p className="header bold"> {regressionName} </p>
            <div className="card chart">
                <canvas id={regressionName} ></canvas>
            </div>
            <p className="subheader"><span className="bold">R squared: </span>{regression.r_squared}</p>
            <p className="subheader"><span className="bold">Model: </span>{regression.formula}</p>
        </div>
    )
}

export default RegressionChart;