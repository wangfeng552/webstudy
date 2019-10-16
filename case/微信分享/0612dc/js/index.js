(function ($) {
    if (!$) {
        return false;
    }
    $.fn.find = function (selector) {
        return $(this.selector + ' ' + selector);
    };
    $.fn.html = function (htmlStr) {
        if (typeof(htmlStr) == 'undefined') {
            return (this[0] && this[0].innerHTML) || '';
        } else {
            this.each(function (index, element) {
                element.innerHTML = htmlStr;
            });
            return this;
        }
    };
    $.fn.attr = function (name, value) {
        if (typeof(value) == 'undefined') {
            return (this[0] && this[0].getAttribute(name)) || '';
        } else {
            this.each(function (index, element) {
                element.setAttribute(name, value);
            });
            return this;
        }
    };
    $.fn.show = function () {
        this.each(function (index, element) {
            element.style.display = 'block';
        });
        return this;
    };
    $.fn.hide = function () {
        this.each(function (index, element) {
            element.style.display = 'none';
        });
        return this;
    };
    $.fn.tap = function (callback) {
        this.each(function (index, element) {
            element.addEventListener('tap', callback);
        });
        return this;
    };
    $.fn.addClass = function (className) {
        this.each(function (index, element) {
            element.classList.add(className);
        });
        return this;
    };
    $.fn.removeClass = function (className) {
        this.each(function (index, element) {
            element.classList.remove(className);
        });
        return this;
    };
})(window.mui);
(function () {
    var login_token = cookieUtil.get('login_token') || '';
    var action1= stringUtil.getQueryValue('action1') || '';
    var _channel = '02005260';
    var activityCode ='02005260';
    // var activityCode ='02009988'
    var activity = {
        loginOut: document.getElementById('loginOut'),
        init: function () {
            var _self = this;
            _self.setEvent();
            _self.isLogin(); // 是否显示otp
            _self.getShareUrl();// 获取分享用户信息
            _self.btnShare();// 点击分享
            _self.setCall(); // 点击打call
        },
        getShareUrl:function () {
            var self =this;
            userUtil.check_v1(function(token) {
                if (token) {
                    ajaxUtil.loadData({
                        url: '/pointgate/recommend/getloginmember.htm',
                        params: {
                            token: login_token
                        },
                        onSuccess: function(data) {
                            var data = JSON.parse(data);
                            self.shareConfig('/event/2018/0612dc/index.html?action1=' + data.userid + '&channel_source=' + _channel);
                            localStorage.setItem('uesrId', data.userid);
                            localStorage.setItem('hidemobileid', data.hidemobileid);
                            if (browserUtil.weixin) {
                                wx.ready(function() {
                                    var shareData = {
                                        title: window._shareData.title.othTitle,
                                        link: window._shareData.shareurl,
                                        imgUrl: window._shareData.imageurl,
                                        desc: window._shareData.content
                                    }
                                    //分享给朋友
                                    wx.onMenuShareAppMessage(shareData);
                                    //分享到朋友圈
                                    wx.onMenuShareTimeline(shareData);
                                    //分享到qq
                                    wx.onMenuShareQQ(shareData);
                                    //分享到qq空间
                                    wx.onMenuShareQZone(shareData);
                                });
                            }
                        },
                        onError: function() {
                            self.shareConfig('/event/2018/0612dc/index.html?sharemode=true');
                        }
                    });
                } else {
                    self.shareConfig('/event/2018/0612dc/index.html?sharemode=true');
                }
            })
        },
        shareConfig:function (shareURI) {
            window._shareData = {
                title: {
                    wechat: '为绿茵冠军队打call',
                    othTitle: '为绿茵冠军队打call'
                },
                content: '打call集碎片，拼出10000元携程礼品卡俄罗斯旅游基金，赶快一起吧～',
                imageurl: location.origin + '/event/2018/0612dc/img/share.jpg',
                shareurl: location.origin + shareURI,

            }
            if (!browserUtil.jfmore) {
                wxshare();
                setShareInfo({
                    title: window._shareData.title.othTitle,
                    summary: window._shareData.content,
                    pic: window._shareData.imageurl,
                    url: window._shareData.shareurl
                });
            }
        },
        btnShare:function () {
            var self =this;
            var $btnShare=document.querySelector('.btn-yqhy-call');
            $btnShare.addEventListener('click', function() {
                userUtil.check_v1(function(token) {
                    if (token) {
                        self.shareFn();
                    } else {
                        // userUtil.checkLogin(location.href);
                        mui.confirm('请您先注册再打call哦！', '提示', ['我知道了'])
                    }
                })
            })
        },
        shareFn: function() {
            if (browserUtil.weixin || browserUtil.jfmore) {
                if (document.querySelector('.share-tips')) {
                    document.querySelector('.share-tips').style.display = 'block';
                } else {
                    createG();
                }

                function createG() {
                    var shareEle = document.createElement('div');
                    shareEle.className = 'share-tips';
                    document.body.appendChild(shareEle);
                    document.querySelector('.share-tips').addEventListener('click', function(e) {
                        e.target.style.display = 'none';
                    });
                }
            } else {
                mui.alert('请前往畅由app或微信公众号参加活动哦');
            }
        },
        setCall:function () {
            var m =this;
            $('.callmain li a').on("click",function (e) {
                e.preventDefault();
                var athletes = $(this).attr('wfqiuyuan')
                var isDisable =$(this).parents('.callmain').hasClass('calldisable')
                userUtil.check_v1(function (token) {
                    //已登陆
                    if (token) {
                        if(!isDisable){
                            mui.confirm('本次打call将扣除10畅由积分', '提示', ['继续打call', '我在看看'], callback)
                            function callback(e) {
                                if (e.index == 0) {
                                    m.hitCall(athletes)
                                }
                            }
                        }
                    } else {
                        mui.confirm('请您先注册再打call哦！', '提示', ['我知道了'])
                    }
                })
            })
        },
        hitCall:function (athletes) {
            var m = this;
            ajaxUtil.loadData({
                url: '/pointgate/activity-web/hitCall',
                type: 'POST',
                params: {
                    loginToken: login_token,
                    activityCode: '02005261',
                    athletes:athletes
                },
                onSuccess: function (data) {
                    var spList=data;
                    var length=spList.length;
                    var html = '';
                    spList.forEach(function (v,i) {
                        html +='<img src="'+v.pic+'">'
                    })
                    $('.sp').html(length+'张碎片')
                    $('.pic-ls').append(html)
                    $('.callmain').addClass('calldisable')
                    $('.getfragment').show();
                },
                onError: function (data) {
                    mui.toast(data.msg, {duration: '1000', type: 'div'});
                }
            });
        },
        getHitCall:function () {
            var m = this;
            ajaxUtil.loadData({
                url: '/pointgate/activity-web/getHitCall',
                type: 'POST',
                params: {
                    loginToken: login_token,
                    activityCode: '02005261'
                },
                onSuccess: function (data) {
                    if(data.length!=0){
                        $('.callmain').addClass('calldisable')
                    }
                },
                onError: function (data) {
                    mui.toast(data.msg, {duration: '1000', type: 'div'});
                }
            });
        },
        isLogin: function () {
            var _self = this;
            userUtil.check_v1(function (token) {
                //已登陆
                if (token) {
                    _self.loginOut.style.display = 'none'
                    _self.getHitCall();//打call纪录
                } else {
                    _self.loginOut.style.display = 'block'
                }
            });
        },
        setEvent: function () {
            var m = this;
            m.isClicked = 0;
            $('#btnGetVer').click(function (event) {
                var th = this;
                var v = document.querySelector('#iptMobile').value;
                if (!v) {
                    setTimeout(function () {
                        mui.toast('请输入手机号码', {duration: '1000', type: 'div'});
                    }, 50);
                    return;
                }
                if (!m.isMobile(v && v.trim())) {
                    setTimeout(function () {
                        mui.toast('请输入正确的手机号码', {duration: '1000', type: 'div'});
                    }, 50);
                    return;
                }
                document.getElementById('btnGetVer').disabled = true;
                m.sendMsg(function () {
                    m.countDown(th, 60);
                    mui.toast('验证码发送成功', {duration: '1', type: 'div'});
                });
            });
            // 图形验证码
            $('#imgObj').click(function (event) {
                m.updateImgCode();
            });
            // 立即绑定
            $('#btnBind').click(function (event) {
                var v = document.querySelector('#iptMobile').value;
                if (!v) {
                    setTimeout(function () {
                        mui.toast('请输入手机号码', {duration: '1000', type: 'div'});
                    }, 50);
                    return;
                }
                if (!m.isMobile(v && v.trim())) {
                    setTimeout(function () {
                        mui.toast('请输入正确的手机号码', {duration: '1000', type: 'div'});
                    }, 50);
                    return;
                }
                var code = document.querySelector('#iptVer').value;
                if (!/\d{4}/.test(code && code.trim())) {
                    setTimeout(function () {
                        mui.toast('请输入正确的验证码', {duration: '1000', type: 'div'});
                    }, 50);
                    return;
                }
                var isShow = document.querySelector('#picIsShow').style.display;
                var piccode = document.querySelector('#iptPic').value;
                if (isShow) {
                    if (!/\d{4}/.test(piccode && piccode.trim())) {
                        setTimeout(function () {
                            mui.toast('请输入正确的验证码', {duration: '1000', type: 'div'});
                        }, 50);
                        return;
                    }
                }
                m.sbm(v, code, piccode);
            });
            //关闭弹窗
            $('.js-close-pop,.js-btn-pop').click(function () {
                $('.getfragment').hide();
            })
            //活动规则显示
            $('.goguize').click(function (e) {
                e.preventDefault();
                $('.hdgzpop').show();
            })
            $('.close-rz').click(function (e) {
                e.preventDefault();
                $('.hdgzpop').hide();
            })
        },
        countDown: function (dom, t) {
            var m = this;
            if (this.isClicked) return;
            this.isClicked = 1;
            var timer = setInterval(function () {
                if (t > 1) {
                    dom.innerHTML = t + '秒后重新发送';
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
        sendMsg: function (fn) {
            var m = this;
            ajaxUtil.loadData({
                url: '/pointgate/activityRegister/sendAuthCode',
                type: 'POST',
                params: {
                    mobileid: document.querySelector('#iptMobile').value,
                    activityCode: '02005260'
                },
                onSuccess: function (data) {
                    fn();
                },
                onError: function (data) {
                    mui.toast(data.msg, {duration: '1000', type: 'div'});
                    document.getElementById('btnGetVer').disabled = false;
                }
            });
        },
        // 提交注册
        sbm: function (mobileid, verifyCode, piccode) {
            var m = this;
            ajaxUtil.loadData({
                type: 'POST',
                url: '/pointgate/activityRegister/inviteRegister',
                params: {
                    mobileid: mobileid,
                    smsCode: verifyCode,
                    imgCode: piccode,
                    round: m.round || '',
                    fingerprint: _fmOpt.getinfo(),
                    sessionId: window.sessionId || '',
                    activityCode: '02005260',
                    channelSource: '02005260',
                    outuserid:action1
                },
                onSuccess: function () {
                    spm.push(['_trackEvent', '/pointgate/activityRegister/inviteRegister', 'click', "0000"]);
                    spm.refresh()
                },
                onError: function (data) {
                    spm.push(['_trackEvent', '/pointgate/activityRegister/inviteRegister', 'click', data.code || data.msg]);
                    if (data.code === "10001005" || data.code === '80901820') {
                        m.updateImgCode();
                        $("#picIsShow").show();
                        mui.toast(data.msg, {duration: '1000', type: 'div'});
                    } else if (data.code === '18099900' || data.code === "18010086") {
                        mui.alert(data.msg, '提示', '返回首页', function () {
                            spm.refresh('/jfmall/index.htm');
                        })
                    } else {
                        m.updateImgCode();
                        mui.toast(data.msg, {duration: '1000', type: 'div'});
                    }
                }
            });
        },
        isMobile: function (v) {
            return (new RegExp(/^1\d{10}$/).test(v));
        },
        // 图形验证码
        updateImgCode: function () {
            var m = this;
            document.querySelector('#imgObj').src = m.changeUrl();
        },
        changeUrl: function () {
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
        },
        // 活动结束蒙版
        activityOver: function () {
            ajaxUtil.currTime(function (data) {
                var time = data.getTime();
                if (time > 1543593600000) {
                    document.querySelector('.wrapper-toast').style.display = 'block';
                    setTimeout(function () {
                        spm.refresh('/jfmall/index.htm')
                    }, 2000);
                }

            })
        }
    }
    activity.init();
})();