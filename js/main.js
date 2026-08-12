// 인쇄 시 모든 프로젝트 카드가 펼쳐진 상태로 출력되도록 한다.
// 모던 브라우저: print CSS의 ::details-content 규칙이 처리 (DOM 변이 없음 — 인쇄
// 미리보기가 beforeprint 재발화 없이 재생성되어도 안전).
// ::details-content 미지원 구형 브라우저만 beforeprint/afterprint JS 폴백을 쓴다.
(function () {
  var cssReveal = window.CSS && CSS.supports && CSS.supports("selector(::details-content)");
  if (cssReveal) return;

  var saved = null;

  function expandAll() {
    if (saved !== null) return; // 중복 발화 시 원상태 보존
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
})();
