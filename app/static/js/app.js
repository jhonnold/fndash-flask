$(document).foundation();

$(document).ready(() => {
  const pieChartOptions = {
    aspectRatio: 2,
    legend: {
      display: false,
      position: 'right',
      labels: {
        fontColor: '#fafafa',
      },
    },
  };

  const kdChartOptions = {
    responsive: true,
    aspectRatio: 2,
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        fontColor: '#fafafa',
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0.75,
            max: 1.5,
            stepSize: 0.25,
            fontColor: '#fafafa',
          },
          gridLines: {
            color: 'rgba(255, 255, 255, 0.125)',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: '#fafafa',
          },
        },
      ],
    },
  };

  let kdSolo, kdDuo, kdSquad;
  let kdAll = new Chart($('#kd-graph-all'), {
    type: 'line',
    data: kdAllData,
    options: kdChartOptions,
  });

  let placementSolo, placementDuo, placementSquad;
  let placementAll = new Chart($('#placement-graph-all'), {
    type: 'pie',
    data: placementAllData,
    options: pieChartOptions,
  });

  $('#mode-tabs').on('change.zf.tabs', function() {
    var tabId = $('div[data-tabs-content="' + $(this).attr('id') + '"]')
      .find('.tabs-panel.is-active')
      .attr('id');

    switch (tabId) {
      case 'all_stats':
        if (kdAll) kdAll.destroy();
        kdAll = new Chart($('#kd-graph-all'), {
          type: 'line',
          data: kdAllData,
          options: kdChartOptions,
        });

        if (placementAll) placementAll.destroy();
        placementAll = new Chart($('#placement-graph-all'), {
          type: 'pie',
          data: placementAllData,
          options: pieChartOptions,
        });
        break;
      case 'solo_stats':
        if (kdSolo) kdSolo.destroy();
        kdAll = new Chart($('#kd-graph-solo'), {
          type: 'line',
          data: kdSoloData,
          options: kdChartOptions,
        });

        if (placementSolo) placementSolo.destroy();
        placementSolo = new Chart($('#placement-graph-solo'), {
          type: 'pie',
          data: placementSoloData,
          options: pieChartOptions,
        });
        break;
      case 'duo_stats':
        if (kdDuo) kdDuo.destroy();
        kdDuo = new Chart($('#kd-graph-duo'), {
          type: 'line',
          data: kdDuoData,
          options: kdChartOptions,
        });

        if (placementDuo) placementDuo.destroy();
        placementDuo = new Chart($('#placement-graph-duo'), {
          type: 'pie',
          data: placementDuoData,
          options: pieChartOptions,
        });
        break;
      case 'squad_stats':
        if (kdSquad) kdSquad.destroy();
        kdSquad = new Chart($('#kd-graph-squad'), {
          type: 'line',
          data: kdSquadData,
          options: kdChartOptions,
        });

        if (placementSquad) placementSquad.destroy();
        placementDuo = new Chart($('#placement-graph-squad'), {
          type: 'pie',
          data: placementSquadData,
          options: pieChartOptions,
        });
        break;
      default:
        break;
    }
  });
});
