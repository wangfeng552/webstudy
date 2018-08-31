(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      var clientWidth = document.body.clientWidth;
      if (!clientWidth) return;
      var toFS = 50 * (clientWidth / 375);
      docEl.style.fontSize = toFS + "px";
      setTimeout(() => {
        var ft = parseInt(getComputedStyle(docEl).fontSize);
        if (toFS != ft) {
          docEl.style.fontSize = toFS + "px";
        }
      }, 1000);
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);
