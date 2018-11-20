<template>
<div class="layout">
    <div class="countdown">
        <span class="timer">{{day}}</span>
        <span class="maohao">:</span>
        <span class="timer">{{hour}}</span>
        <span class="maohao">:</span>
        <span class="timer">{{minutes}}</span>
        <span class="maohao">:</span>
        <span class="timer">{{second}}</span>
    </div>
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide class="slide-1">1</swiper-slide>
        <swiper-slide class="slide-2">2</swiper-slide>
        <swiper-slide class="slide-3">3</swiper-slide>
        <swiper-slide class="slide-4">4</swiper-slide>
        <swiper-slide class="slide-5">5</swiper-slide>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <div class="mk">
        <ul>
            <li :class="{isActive:swiperShowIndex == i}" @click="goSlide(i)" :key="i" v-for="(v,i) in 5">
                <div v-if="swiperShowIndex == i" @click="show">{{v}}</div>
            </li>
        </ul>
    </div>
    <!--购买弹窗-->
    <mt-popup v-model="popupVisibleBuy" position="bottom">
        <div class="buypop">
            123123132
        </div>
    </mt-popup>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex"
import {
    browserUtil,
    stringUtil,
    jsBridge
} from "@/assets/js/common"
import {
    getShareConfigList
} from "@/api/http"
let destroyedChives, time
export default {
    data() {
        var vm = this
        return {
            swiperShowIndex: 0,
            swiperOptionTop: {
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                on: {
                    slideChange: function () {
                        const realIndex = this.activeIndex
                        vm.handleClickSlide(realIndex)
                    }
                }
            },
            popupVisibleBuy: false, // 购买弹窗
            minutes: "",
            second: "",
            hour: "",
            day: ""
        }
    },
    created() {
        this.$store.dispatch("getSourceParam", "")
        let sourceParam = stringUtil.getQueryValue("sourceParam") || ""
        if (sourceParam) {
            this.$store.dispatch("getSourceParam", sourceParam)
        }
        if (browserUtil().bigerIos || browserUtil().bigerAndroid) {
            let appToken = decodeURIComponent(stringUtil.getQueryValue("token")) || ""
            this.$store.dispatch("getAppToken", {
                token: appToken
            })
        } else {
            this.getShareConfigList() // 获取分享信息
        }
        this.startDaojishi()
    },
    computed: {
        ...mapGetters(["token"]),
        hasToken() {
            if (this.token) {
                return true
            } else {
                return false
            }
        },
        isApp() {
            if (browserUtil().bigerAndroid || browserUtil().bigerIos) {
                return true
            } else {
                return false
            }
        },
        swiper() {
            return this.$refs.swiperTop.swiper
        }
    },
    mounted() {
        this.swiper.slideTo(0, 1000, false)
    },
    methods: {
        startDaojishi() {
            // 倒計時
            let leftTime = parseInt(1542098363151 - 1542011871385 - 60000)
            let lastTime = +new Date()
            time = setInterval(() => {
                const costTime = +new Date() - lastTime
                lastTime = +new Date()
                let d = this.formate(parseInt((leftTime / 1000 / 60 / 60 / 24)))
                let h = this.formate(parseInt((leftTime / 1000 / 60 / 60) % 24))
                let m = this.formate(parseInt((leftTime / 1000 / 60) % 60))
                let s = this.formate(parseInt((leftTime / 1000) % 60))
                if (leftTime <= 0) {
                    this.minutes = "00"
                    this.second = "00"
                    this.hour = "00"
                    this.dat = "00"
                    clearInterval(time)
                    // this.getChivesActivityTime()
                } else {
                    this.minutes = `${m}`
                    this.second = `${s}`
                    this.hour = `${h}`
                    this.day = `${d}`
                }
                leftTime -= costTime
            }, 1000)
        },
        handleClickSlide(index) {
            this.swiper.slideTo(index, 1000, false)
            this.swiperShowIndex = index
        },
        goSlide(index) {
            this.swiper.slideTo(index, 1000, false)
            this.swiperShowIndex = index
        },
        show() {
            this.popupVisibleBuy = true
        },
        goSin() {
            // this.$router.push({ name: "recharge" })  // 充值
            // this.toSign();
            this.$show()
            jsBridge.share()
        },
        async getShareConfigList() {
            // 分享拿后台数据
            try {
                if (this.token) {
                    let res = await getShareConfigList()
                    let data = res.filter((v, i) => {
                        return v.entrance === "3"
                    })
                    this.shareMessage = data[0]
                    let url = this.shareMessage.shareUrl
                    let h = url.split("?")
                    let sp = h[1].split("&")[0]
                    sp = sp.slice(12)
                    let newUrl = h[0] + "?sourceParam=" + btoa(sp)
                    if (this.langActivity == "en") {
                        newUrl += "&language=en"
                    } else {
                        newUrl += "&language=zh"
                    }
                    this.$sharePost({
                        url: newUrl
                    })
                }
            } catch (error) {
                this.$store.dispatch("logout", "")
            }
        },
        formate(time) {
            if (time > 9) {
                return time
            } else {
                return `0${time}`
            }
        },
    },
    destroyed() {
        clearInterval(destroyedChives)
    }
}
</script>

<style lang="less">
.isActive {
    color: #fff;
}

.buypop {
    width: 750px;
    height: 100px;
    background-color: #fff;
}

@media screen and (max-width: 650px) {
    // 手机
}

@media screen and (min-width: 650px) {
    // PC
}
</style>
