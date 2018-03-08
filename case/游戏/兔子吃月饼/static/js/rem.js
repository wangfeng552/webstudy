(function() {
	var w = window, d = document, de = d.documentElement, cw = 'clientWidth', ae = 'addEventListener', oc = 'orientationchange', rs = 'resize', dl = 'DOMContentLoaded';
	var fs = 16, mw = de.getAttribute('data-pagewidth') || 750;
	var as = function() { if (de[cw]) de.style.fontSize = 100*(de[cw]/mw)*16/fs +'px'; };
	try { fs = window.getComputedStyle(document.documentElement,null).fontSize.replace('px','') || 16; } catch(e) {}
	w[ae] && w[ae]((oc in w?oc:rs), as, false);
	d[ae] && d[ae](dl, as, false);
	d.querySelector('html').classList.add('webview-rem');
	as();
})();