/*
 * mui.extend 扩展方法
 */
(function($) {
    if (!$) {
        return false;
    }
    $.fn.find = function(selector) {
        return $(this.selector + ' ' + selector);
    };
    $.fn.html = function(htmlStr) {
        if (typeof(htmlStr) == 'undefined') {
            return (this[0] && this[0].innerHTML) || '';
        } else {
            this.each(function(index, element) {
                element.innerHTML = htmlStr;
            });
            return this;
        }
    };
    $.fn.attr = function(name, value) {
        if (typeof(value) == 'undefined') {
            return (this[0] && this[0].getAttribute(name)) || '';
        } else {
            this.each(function(index, element) {
                element.setAttribute(name, value);
            });
            return this;
        }
    };
    $.fn.show = function() {
        this.each(function(index, element) {
            element.style.display = 'block';
        });
        return this;
    };
    $.fn.hide = function() {
        this.each(function(index, element) {
            element.style.display = 'none';
        });
        return this;
    };
    $.fn.tap = function(callback) {
        this.each(function(index, element) {
            element.addEventListener('tap', callback);
        });
        return this;
    };
    $.fn.addClass = function(className) {
        this.each(function(index, element) {
            element.classList.add(className);
        });
        return this;
    };
    $.fn.removeClass = function(className) {
        this.each(function(index, element) {
            element.classList.remove(className);
        });
        return this;
    };
})(window.mui);
(function() {
    var login_token = cookieUtil.get('login_token');
    var _channel = stringUtil.getQueryValue('channel_source') || spm.getSource() || '',
        channel_source = (_channel ? '?channel_source=' + _channel : "");
    var activity = {
        regs: document.querySelector('.regs'),
        init: function() {
            var m = this;
            this.setEvent();
        },
        setEvent: function() {
            var m = this;
            m.isClicked = 0;
            mui('#btnGetVer').tap(function(event) {
                var th = this;
                var v = document.querySelector('#iptMobile').value;
                if (!v) {
                    setTimeout(function() {
                        mui.toast('请输入手机号码', { duration: '1000', type: 'div' });
                    }, 50);
                    return;
                }
                if (!m.isMobile(v && v.trim())) {
                    setTimeout(function() {
                        mui.toast('请输入正确的手机号码', { duration: '1000', type: 'div' });
                    }, 50);
                    return;
                }
                document.getElementById('btnGetVer').disabled = true;
                m.sendMsg(function() {
                    m.countDown(th, 60);
                    mui.toast('验证码发送成功', { duration: '1', type: 'div' });
                });
            });
            // 图形验证码
            mui('#imgObj').tap(function(event) {
                m.updateImgCode();
            });
            // 立即绑定
            mui('#btnBind').tap(function(event) {
                var v = document.querySelector('#iptMobile').value;
                if (!v) {
                    setTimeout(function() {
                        mui.toast('请输入手机号码', { duration: '1000', type: 'div' });
                    }, 50);
                    return;
                }
                if (!m.isMobile(v && v.trim())) {
                    setTimeout(function() {
                        mui.toast('请输入正确的手机号码', { duration: '1000', type: 'div' });
                    }, 50);
                    return;
                }
                var code = document.querySelector('#iptVer').value;
                if (!/\d{4}/.test(code && code.trim())) {
                    setTimeout(function() {
                        mui.toast('请输入正确的验证码', { duration: '1000', type: 'div' });
                    }, 50);
                    return;
                }
                var isShow = document.querySelector('#picIsShow').style.display;
                var piccode = document.querySelector('#iptPic').value;
                if (isShow) {
                    if (!/\d{4}/.test(piccode && piccode.trim())) {
                        setTimeout(function() {
                            mui.toast('请输入正确的图形验证码', { duration: '1000', type: 'div' });
                        }, 50);
                        return;
                    }
                }
                m.sbm(v, code, piccode);
            });
            mui('.close').tap(function() {
                mui('.m-alert').hide();
            });
        },
        countDown: function(dom, t) {
            var m = this;
            if (this.isClicked) return;
            this.isClicked = 1;
            var timer = setInterval(function() {
                if (t > 1) {
                    dom.innerHTML = t + 'S';
                } else {
                    dom.innerHTML = '获取验证码';
                    document.getElementById('btnGetVer').disabled = false;
                    m.isClicked = 0;
                    clearInterval(timer);
                }
                t--;
            }, 1000);
        },
        //发送验证码
        sendMsg: function(fn) {
            var m = this;
            ajaxUtil.loadData({
                url: '/pointgate/activityRegister/sendAuthCode',
                type: 'POST',
                params: {
                    mobileid: document.querySelector('#iptMobile').value,
                    activityCode: '02005020',
                    channelSource: _channel
                },
                onSuccess: function(data) {
                    fn();
                },
                onError: function(data) {
                    mui.toast(data.msg, { duration: '1000', type: 'div' });
                }
            });
        },
        // 提交注册
        sbm: function(mobileid, verifyCode, piccode) {
            var m = this;
            ajaxUtil.loadData({
                type: 'POST',
                url: '/pointgate/activityRegister/register',
                params: {
                    mobileid: mobileid,
                    smsCode: verifyCode,
                    imgCode: piccode,
                    round: m.round || '',
                    fingerprint: _fmOpt.token,
                    activityCode: '02005020',
                    channelSource: _channel
                },
                onSuccess: function(data) {
                    spm.push(['_trackEvent', '立即领取', 'click', 'success', _channel]);
                    spm.push(['_trackEvent', '/pointgate/activityRegister/register', 'click', 'success']);
                    spm.refresh('/event/2018/03081/main.html');
                },
                onError: function(err) {
                    // 老用户
                    // if (err.code === '18010086') {
                    //     mui.alert('很抱歉，老用户无法参与活动', '  ', '确定');
                    //     return;
                    // }

                    if (err.code === '10001005') {
                        m.updateImgCode();
                        mui("#picIsShow").show();
                        mui.toast(err.msg, { duration: '1000', type: 'div' });
                    } else {
                        m.updateImgCode();
                        mui.toast(err.msg, { duration: '1000', type: 'div' });
                    }
                }
            });
        },
        isMobile: function(v) {
            return (new RegExp(/^1\d{10}$/).test(v));
        },
        // 图形验证码
        updateImgCode: function() {
            var m = this;
            document.querySelector('#imgObj').src = m.changeUrl();
        },
        changeUrl: function() {
            var url = '/pointgate/Validate/queryPicValidate';
            var timestamp = (new Date()).valueOf();

            function guid() {
                function S4() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }

                return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
            }

            uuuid = guid()
            var index = url.indexOf("?", url);
            if (index > 0) {
                url = url.substring(0, url.indexOf(url, "?"));
            }
            if ((url.indexOf("&") >= 0)) {
                url = url + "×tamp=" + timestamp;
            } else {
                url = url + "?timestamp=" + timestamp + "&round=" + uuuid;
            }
            this.round = uuuid;
            return url;
        }
    }
    activity.init();
})();