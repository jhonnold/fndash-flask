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
        if (placementAll) placementAll.destroy();
        placementAll = new Chart($('#placement-graph-all'), {
          type: 'pie',
          data: placementAllData,
          options: pieChartOptions,
        });
        break;
      case 'solo_stats':
        if (placementSolo) placementSolo.destroy();
        placementSolo = new Chart($('#placement-graph-solo'), {
          type: 'pie',
          data: placementSoloData,
          options: pieChartOptions,
        });
        break;
      case 'duo_stats':
        if (placementDuo) placementDuo.destroy();
        placementDuo = new Chart($('#placement-graph-duo'), {
          type: 'pie',
          data: placementDuoData,
          options: pieChartOptions,
        });
        break;
      case 'squad_stats':
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
