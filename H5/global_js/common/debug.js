/*
 * H5活动页Debug工具
 * 最后更新： 姜小羊, 2016-08-02
 */
(function() {
	
	var debugConsole = {
		init: function() {
			var that = this, docBody = document.querySelector('body');
			//
			this.css = document.createElement('style');
			this.css.innerHTML = String(function() {/*!
				#debugConsole { position:fixed;left:0;bottom:0;right:0;z-index:99999;width:100%;line-height:16px;background-color:rgba(255,255,153,0.8);font-size:12px;color:#333;border-top:solid 2px #f22d47;-webkit-transition:all 0.8s ease;transition:all 0.8s ease; }
				#debugConsole ol { margin:0;padding:8px 5px;height:290px;overflow:auto; }
				#debugConsole ol li { list-style-type:decimal;margin-top:5px;word-break:break-all;word-wrap:break-word;margin-left:25px;border-top:solid 1px rgba(0,0,0,0.5);padding-top:5px; }
				#debugConsole ol li:first-child { border-top:none;padding-top:0;margin-top:0; }
				#debugConsole .btn-switch { display:block;position:absolute;right:10px;top:-15px;width:70px;line-height:24px;text-align:center;color:#fff;border-radius:4px;background-color:#f22d47; }
				#debugConsole .btn-switch:before { content:'∨'; margin-right:5px; }
				#debugConsole.collapse { bottom:-280px; }
				#debugConsole.collapse .btn-switch:before { content:'∧'; }
			*/}).replace(/^[^\{]*\{\s*\/\*!?|\*\/[;|\s]*\}$/g, '').trim();
			docBody.appendChild(this.css);
			//
			this.element = document.createElement('div');
			this.element.id = 'debugConsole';
			this.element.className = 'collapse';
			this.element.innerHTML = '<ol></ol>';
			docBody.appendChild(this.element);
			//
			this.btnSwitch = document.createElement('span');
			this.btnSwitch.className = 'btn-switch';
			this.btnSwitch.innerHTML = 'Console';
			this.btnSwitch.onclick = function() {
				that.element.className = (that.element.className != 'collapse') ? 'collapse': '';
			};
			this.element.appendChild(this.btnSwitch);
		},
		log: function(msgs) {
			if (!this.element) {
				this.init();
			}
			var liElm = document.createElement('li');
			liElm.innerHTML = msgs;
			this.element.querySelector('ol').appendChild(liElm);
		}
	};
	var debugLog = function() {
		var msgs = [];
		for (var i=0; i<arguments.length; i++) {
			if (typeof (arguments[i]) == 'object') {
				msgs.push(JSON.stringify(arguments[i]));
			} else {
				msgs.push(arguments[i]);
			}
		}
		debugConsole.log(msgs.join(' '));
	};
	var debugAlert = function() {
		var msgs = [];
		for (var i=0; i<arguments.length; i++) {
			if (typeof (arguments[i]) == 'object') {
				msgs.push(JSON.stringify(arguments[i]));
			} else {
				msgs.push(arguments[i]);
			}
		}
		alert(msgs.join('\n'));
	};
	
	var debugMode = location.search.match(/debugmode=(.*)/i) || location.search.match(/debugmode=(.*)\&/i);
	if (debugMode) {
		debugMode = debugMode[1] || '';
	} else {
		debugMode = document.querySelector('body').getAttribute('data-debugmode') || '';
	}
	if (!window.console) {
		window.console = {};
	}
	if (debugMode == 'custom') {
		console.log = debugLog;
		alert = debugLog;
	} else if (debugMode == 'alert') {
		console.log = debugAlert;
	} else if (debugMode != 'console') {
		console.log = function() {};
	}
	
})();