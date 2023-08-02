let globalFunction = {
    // 解决微信键盘收起页面不回弹的问题
    _weChatInputBug() {
        let myFunction;
        const isWXAndIos = this._isWeiXinAndIos();
        if (isWXAndIos) {
            document.body.addEventListener("focusin", () => {
                clearTimeout(myFunction);
            });
            document.body.addEventListener("focusout", () => {
                clearTimeout(myFunction);
                myFunction = setTimeout(() => {
                    let top =
                        document.documentElement.scrollTop ||
                        window.pageYOffset ||
                        document.body.scrollTop;
                    window.scrollTo({ top: top, left: 0, behavior: "smooth" });
                }, 100);
            });
        }
    },
    _isWeiXinAndIos() {
        const ua = `${window.navigator.userAgent.toLowerCase()}`;
        const isWeixin = /MicroMessenger/i.test(ua);
        const isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua);
        return isWeixin && isIos;
    },

    // 微信分享
    wxShare() {
        let self = this;
        let realName = localStorage.getItem("realName");
        this.$WXServe.H5WxShare(
            {
                title: "CAR-T赠险活动",
                desc: `[来自太平代理人${realName}的分享]`,
                imgUrl:
                    "http://img.life.cntaiping.com/tpbb/wechat/img/product/thumbnail/thumbnail_cart.jpg",
                link:
                    this.$axios.defaults.baseURL +
                    `/static/index.html?router=detail-cart&shareHolderId=${this.holderId}&agentCode=${this.agentCode}&holderPhone=${this.holderPhone}&channel=${this.channel}`,
            },
            "",
            {
                success: this.activeLog, // 埋点
                share_list: ["menuItem:share:appMessage"],
            }
        );
    },

    // App分享
    sharePerson() {
        this.activeLog(1);
        let realName = localStorage.getItem("realName");
        if (!this.isResiter) {
            this.$tip.info(
                "请先至太平保宝公众号，注册成为保宝微商城高级用户，以便后续赠险发放。"
            );
            return;
        }
        console.log(this.channelType)
        if (this.channelType == 'wx') {
            this.isShare = true;
        } else {
            appClickShare(
                {
                    asTitle: "太平心肺保特定疾病保险",
                    asDesc: `[来自太平代理人${realName}的分享]您的心肺健康，我们来守护！`,
                    asLink: this.$axios.defaults.baseURL +
                        `/static/index.html?router=check-phone&shareHolderId=${this.shareHolderId}&agentCode=${this.agentCode}&holderPhone=${this.holderPhone}&channel=${this.channel}`,
                    asIcon: "http://img.life.cntaiping.com/tpbb/wechat/img/product/thumbnail/thumbnail190.jpg",
                },
            );
        }
    },
}