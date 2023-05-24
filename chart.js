function doGraph() {
    const xValues = [];
    const yValues = [];
    const amp = parseFloat(document.getElementById('amp').value);
    const period = parseFloat(document.getElementById('period').value);

    if (amp >= 100) {
        alert('Please enter a number under 100');
        throw new Error('Please enter a number under 100');
    }

    const valueString = `${amp} * Math.sin(${period} * x)`;

    generateData(valueString, 0, 2 * Math.PI, 0.005);

    new Chart('chart', {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                fill: false,
                pointRadius: 0,
                borderColor: 'rgb(255, 105, 180)', // Bright pink color
                data: yValues
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `f(x) = ${amp}sin(${period}x)`,
                    font: {
                        size: 16
                    },
                    color: 'rgb(255, 105, 180)' // Bright pink color
                }
            },
            legend: {
                display: false
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 105, 180, 0.2)' // Lighter pink grid lines
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 105, 180, 0.2)' // Lighter pink grid lines
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return Math.ceil(value); // Round up the y-values
                        },
                        maxTicksLimit: 10 // Limit the number of y-axis ticks to 10
                    }
                }
            }
        }
    });

    function generateData(value, xWindowMinus, xWindowPlus, step) {
        for (let x = xWindowMinus; x <= xWindowPlus; x += step) {
            yValues.push(eval(value));
            xValues.push(x);
        }
    }
}

function clearGraph() {
    window.location.reload();
}

const enterBtn = document.getElementById('enterBtn');
const clearBtn = document.getElementById('clearBtn');
enterBtn.addEventListener('click', doGraph);
clearBtn.addEventListener('click', clearGraph);
