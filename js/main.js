// 인쇄 시 모든 프로젝트 카드를 펼치고, 인쇄 후 원래 상태로 복원한다.
// beforeprint 미지원 환경 대비 matchMedia 리스너 병행.
(function () {
  var saved = null;

  function expandAll() {
    var cards = document.querySelectorAll("details.card");
    saved = Array.prototype.map.call(cards, function (d) { return d.open; });
    cards.forEach(function (d) { d.open = true; });
  }

  function restore() {
    if (saved === null) return;
    var cards = document.querySelectorAll("details.card");
    cards.forEach(function (d, i) { d.open = saved[i]; });
    saved = null;
  }

  window.addEventListener("beforeprint", expandAll);
  window.addEventListener("afterprint", restore);

  if (window.matchMedia) {
    window.matchMedia("print").addEventListener("change", function (e) {
      if (e.matches) expandAll(); else restore();
    });
  }
})();
