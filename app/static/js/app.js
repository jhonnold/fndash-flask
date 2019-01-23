const PLACEMENT_CHART_OPTIONS = {
  aspectRatio: 1.5,
  legend: {
    display: false,
    position: 'right',
    labels: {
      fontColor: '#fafafa',
    },
  },
};

const PLACEMENT_CHART_COLORS = ['#ff8300', '#17bebb', '#ffc914', '#007cff'];

const KD_CHART_OPTIONS = {
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

function appendPlacementColors(data) {
  data.datasets = data.datasets.map(d => ({
    data: d.data,
    backgroundColor: PLACEMENT_CHART_COLORS,
  }));
}

appendPlacementColors(placementAllData);
appendPlacementColors(placementSoloData);
appendPlacementColors(placementDuoData);
appendPlacementColors(placementSquadData);

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
        break;
      default:
        break;
    }
  });
});
