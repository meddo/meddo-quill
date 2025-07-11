import $ from "jquery";

window.$ = $;

$(function() {
  window.instance = meditor($('#meditor').get(0));
});
