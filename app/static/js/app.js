$(document).foundation();

$(document).ready(() => {
  $('#mode-tabs').on('change.zf.tabs', function() {
    var tabId = $('div[data-tabs-content="' + $(this).attr('id') + '"]')
      .find('.tabs-panel.is-active')
      .attr('id');
    alert(tabId);
  });
});
