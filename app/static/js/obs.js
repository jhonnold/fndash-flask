$(document).foundation();

function refresh() {
  window.location.reload(true);
}

$(document).ready(() => {
  setTimeout(refresh, 60000);
});