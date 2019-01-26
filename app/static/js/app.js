const PLACEMENT_CHART_OPTIONS = {
  aspectRatio: 2,
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      fontColor: '#fafafa',
    },
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem, data) {
        var dataset = data.datasets[tooltipItem.datasetIndex];
        var index = tooltipItem.index;
        return dataset.labels[index] + ': ' + dataset.data[index];
      },
    },
  },
};

const PLACEMENT_CHART_COLORS = ['#22d900', '#19a100', '#106b00', '#083500'];

const KD_CHART_OPTIONS = {
  responsive: true,
  aspectRatio: 2.5,
  legend: {
    display: true,
    position: 'bottom',
    labels: {
      fontColor: '#fafafa',
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
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

const GAMES_PER_DAY_CHART_OPTIONS = {
  responsive: true,
  aspectRatio: 2.5,
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
        gridLines: {
          color: 'rgba(255, 255, 255, 0.125)',
        },
        ticks: {
          fontColor: '#fafafa',
        },
      },
    ],
  },
};

const GAMES_PER_DAY_COLORS = [
  '#083500',
  '#0c5000',
  '#106b00',
  '#158600',
  '#19a100',
  '#1dbb00',
  '#22d900',
];

function appendPlacementColors(data) {
  data.datasets = data.datasets.map(d => ({
    data: d.data,
    label: d.label,
    labels: d.labels,
    backgroundColor: PLACEMENT_CHART_COLORS,
  }));
}

function appendGamesColors(data) {
  data.datasets = data.datasets.map(d => ({
    data: d.data,
    backgroundColor: GAMES_PER_DAY_COLORS,
  }));
}

appendPlacementColors(placementAllData);
appendPlacementColors(placementSoloData);
appendPlacementColors(placementDuoData);
appendPlacementColors(placementSquadData);

appendGamesColors(gamesAllData);
appendGamesColors(gamesSoloData);
appendGamesColors(gamesDuoData);
appendGamesColors(gamesSquadData);

$(document).foundation();

$(document).ready(() => {
  let kdSolo, kdDuo, kdSquad;
  let kdAll = new Chart($('#kd-graph-all'), {
    type: 'line',
    data: kdAllData,
    options: KD_CHART_OPTIONS,
  });

  let placementSolo, placementDuo, placementSquad;
  let placementAll = new Chart($('#placement-graph-all'), {
    type: 'pie',
    data: placementAllData,
    options: PLACEMENT_CHART_OPTIONS,
  });

  let gamesPerDaySolo, gamesPerDayDuo, gamesPerDaySquad;
  let gamesPerDayAll = new Chart($('#games-graph-all'), {
    type: 'bar',
    data: gamesAllData,
    options: GAMES_PER_DAY_CHART_OPTIONS,
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
          options: KD_CHART_OPTIONS,
        });

        if (placementAll) placementAll.destroy();
        placementAll = new Chart($('#placement-graph-all'), {
          type: 'pie',
          data: placementAllData,
          options: PLACEMENT_CHART_OPTIONS,
        });

        if (gamesPerDayAll) gamesPerDayAll.destroy();
        gamesPerDayAll = new Chart($('#games-graph-all'), {
          type: 'bar',
          data: gamesAllData,
          options: GAMES_PER_DAY_CHART_OPTIONS,
        });
        break;
      case 'solo_stats':
        if (kdSolo) kdSolo.destroy();
        kdAll = new Chart($('#kd-graph-solo'), {
          type: 'line',
          data: kdSoloData,
          options: KD_CHART_OPTIONS,
        });

        if (placementSolo) placementSolo.destroy();
        placementSolo = new Chart($('#placement-graph-solo'), {
          type: 'pie',
          data: placementSoloData,
          options: PLACEMENT_CHART_OPTIONS,
        });

        if (gamesPerDaySolo) gamesPerDaySolo.destroy();
        gamesPerDaySolo = new Chart($('#games-graph-solo'), {
          type: 'bar',
          data: gamesSoloData,
          options: GAMES_PER_DAY_CHART_OPTIONS,
        });
        break;
      case 'duo_stats':
        if (kdDuo) kdDuo.destroy();
        kdDuo = new Chart($('#kd-graph-duo'), {
          type: 'line',
          data: kdDuoData,
          options: KD_CHART_OPTIONS,
        });

        if (placementDuo) placementDuo.destroy();
        placementDuo = new Chart($('#placement-graph-duo'), {
          type: 'pie',
          data: placementDuoData,
          options: PLACEMENT_CHART_OPTIONS,
        });

        if (gamesPerDayDuo) gamesPerDayDuo.destroy();
        gamesPerDayDuo = new Chart($('#games-graph-duo'), {
          type: 'bar',
          data: gamesDuoData,
          options: GAMES_PER_DAY_CHART_OPTIONS,
        });
        break;
      case 'squad_stats':
        if (kdSquad) kdSquad.destroy();
        kdSquad = new Chart($('#kd-graph-squad'), {
          type: 'line',
          data: kdSquadData,
          options: KD_CHART_OPTIONS,
        });

        if (placementSquad) placementSquad.destroy();
        placementDuo = new Chart($('#placement-graph-squad'), {
          type: 'pie',
          data: placementSquadData,
          options: PLACEMENT_CHART_OPTIONS,
        });

        if (gamesPerDaySquad) gamesPerDaySquad.destroy();
        gamesPerDaySquad = new Chart($('#games-graph-squad'), {
          type: 'bar',
          data: gamesSquadData,
          options: GAMES_PER_DAY_CHART_OPTIONS,
        });
        break;
      default:
        break;
    }
  });
});
