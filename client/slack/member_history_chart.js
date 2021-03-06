import $ from 'jquery';
import Chart from 'chart.js';


function buildMemHisChart(slackMemberMonthlyCount) {
    var obj = slackMemberMonthlyCount;
    new Chart($("#member_history_chart"), {
        type: 'line',
        data: {
            labels: obj.xlabels,
            datasets: [{
                label: '# of Members',
                data: obj.counts,
                backgroundColor: [
                    'rgba(66, 125, 167, 1)'
                ],
                borderColor: [
                    'rgba(0,0,0,1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Membership Growth'
            },
            scales: {
                xAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                display: true,
                                min: 0,
                                max: Object.keys(obj.xlabels).length,
                                stepSize: Object.keys(obj.xlabels).length/5,
                            }
                       }],
                yAxes: [{
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: true
                            }
                       }]
            }
        }
    });
}

export default (slackMemberMonthlyCount) => {
    let chart;
    $(window).on('orientationchange pageshow resize', () => {
        if (!chart) {
            chart = buildMemHisChart(slackMemberMonthlyCount);
        }
        const chartElem = $('#member_history_chart');
        const chartContainer = $('#member_history_chart_container');
        chartElem.height(chartContainer.height());
        chartElem.width(chartContainer.width());
        chart.invalidateSize();
        chart.setView([10, 0], 0);
    }).trigger('resize');
};
