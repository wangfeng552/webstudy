// 对接通付盾接口
(function () {
    var url, ts, sessionId, appId, appkey;
    if (document.domain === 'm.changyoyo.com') {
        url = "tfd.changyoyo.com";
    } else {
        url = "101.132.237.10:8080";
    }
    appId = "5308e20b";
    appkey = "3daf27ea2fe840ada6af8e1ec0d7b760";
    ts = new Date().getTime();
    sessionId = "changyo-pc-" + ts + "-" + Math.random().toString(16).substr(2);
    window.sessionId = sessionId;
    with(document){
        [getElementsByTagName('script')[0].parentNode.appendChild(createElement('script')).src = "//" + url + "/did/js/dp.js?appId=" + appId + "&appkey=" + appkey + "&sessionId=" + sessionId + "&ts=" + ts][0];
    }
})();