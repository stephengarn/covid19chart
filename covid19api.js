(async () => {
    var refinedDates = [];
    var newAverages = [];
    var newSpliceAverages = [];
    let averages = [];
    let apiData = {};
    let dailyConfirmed = [];
    let dateOfData = [];
    let highestConfirmed = [];
    const response = await $.ajax({
        url: "https://corona-api.com/countries/CA",
        method: "GET",
    });
    console.log(response['data']);
    for(var i = 0; i < response['data'].length; i++) {
        highestConfirmed.push(response['data'][i]['latest_data']['confirmed']);
    }
    highestConfirmed.sort((a,b) => b-a);
    console.log(highestConfirmed);
    const lengthOfDailyData = response['data']['timeline'].length;
    for (var i = 0; i < lengthOfDailyData; i++) {
        dailyConfirmed.push(response['data']['timeline'][i]["new_confirmed"]);
        dateOfData.push(response['data']['timeline'][i]["date"]);
    }   
    console.log(dailyConfirmed);
    for (var j = 0; j < dailyConfirmed.length; j++) {
        if (j % 7 === 0) {
            sum = parseFloat(((dailyConfirmed[j] + dailyConfirmed[j - 1] + dailyConfirmed[j - 2] + dailyConfirmed[j - 3] + dailyConfirmed[j - 4] + dailyConfirmed[j - 5] + dailyConfirmed[j - 6]) / 7));
            averages.push(sum);
            refinedDates.push(dateOfData[j]);
        }
    }

    console.log(averages);
    console.log(refinedDates);
    var reversedAverages = averages.reverse();
    var reversedDates = refinedDates.reverse();
    console.log(reversedAverages.length);
    console.log(reversedDates.length);
    for(var i = 0; i<=4; i++){
        reversedAverages.shift();
        reversedDates.shift();
    }
    console.log(reversedAverages);
    console.log(reversedDates);
    var ctx = document.getElementById('myChart');

    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: reversedDates,
        datasets: [{
            label: 'Canada\'s 7 day rolling average (new confirmed COVID-19 infections)',
            data: reversedAverages,
            fill: false,
            borderColor: [
                'rgba(24, 24, 209, 0.7)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                stacked: true
            }]
        }
    }
    });
    myChart.canvas.parentNode.style.height = '700px';
    myChart.canvas.parentNode.style.width = '900px';
})();