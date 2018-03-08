(function(){
	var docElm = document.documentElement;
	var pageWidth = docElm.getAttribute('data-pagewidth') || 750;
	var baseFont = 16;
	var adjustEvent = function() {
		if (docElm.clientWidth) {
			docElm.style.fontSize = 100 * (docElm.clientWidth / pageWidth) * 16 / baseFont +'px';
		}
	};
	try {
		baseFont = window.getComputedStyle(docElm,null).fontSize.replace('px','') || 16;
	} catch(e) {}
	//
	window.addEventListener(('orientationchange' in window ? 'orientationchange': 'resize'), adjustEvent, false);
//	document.addEventListener('DOMContentLoaded', adjustEvent, false);
	docElm.classList.add('webview-rem');
	adjustEvent();
})();
