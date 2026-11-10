// 인쇄 시 모든 프로젝트 블록이 펼쳐진 상태로 출력되도록 한다.
// 모던 브라우저: print CSS의 ::details-content 규칙이 처리 (DOM 변이 없음 — 인쇄
// 미리보기가 beforeprint 재발화 없이 재생성되어도 안전).
// ::details-content 미지원 구형 브라우저만 beforeprint/afterprint JS 폴백을 쓴다.
(function () {
  var cssReveal = window.CSS && CSS.supports && CSS.supports("selector(::details-content)");
  if (cssReveal) return;

  var saved = null;

  function expandAll() {
    if (saved !== null) return; // 중복 발화 시 원상태 보존
    var blocks = document.querySelectorAll("details.project");
    saved = Array.prototype.map.call(blocks, function (d) { return d.open; });
    blocks.forEach(function (d) { d.open = true; });
  }

  function restore() {
    if (saved === null) return;
    var blocks = document.querySelectorAll("details.project");
    blocks.forEach(function (d, i) { d.open = saved[i]; });
    saved = null;
  }

  window.addEventListener("beforeprint", expandAll);
  window.addEventListener("afterprint", restore);
})();

// Experience의 교차 링크(#survllm 등)로 이동할 때 대상 프로젝트가 접혀 있으면 펼친다.
// <details>는 id로 이동해도 자동으로 열리지 않으므로 해시 변경 시 직접 연다.
(function () {
  function openTarget() {
    var id = decodeURIComponent(location.hash.slice(1));
    var el = id && document.getElementById(id);
    if (el && el.tagName === "DETAILS") el.open = true;
  }
  window.addEventListener("hashchange", openTarget);
  openTarget(); // 해시가 붙은 링크로 처음 들어온 경우
})();
