<template>
<div>
  <!-- 优惠券 -->
  <div class="member-r" v-if="isShowCoupon">
    <!-- 体验券 -->
    <div class="coupon-main tiyan" v-if="hasShowTiyan">
      <h3 class="title">体验券 <i class="el-icon-question" @click="offFreeDialogShow = true"></i></h3>
      <!-- checkhyqy 勾选 -->
      <div class="coupon-list" :class="{hyqy:!offFreeUse,checkhyqy:offFreeUse}" @click="changeExperience()">
        <div class="c-l">{{offFreeTicket[0].jxc_ticket_name}}</div>
        <div class="c-r"></div>
      </div>
    </div>
    <!-- 会员权益 -->
    <div class="coupon-main coupon" v-if="userBenefitList.length>0">
      <h3 class="title">会员权益</h3>
      <div class="coupon-list" :class="{hyqy:item.is_high_light,checkhyqy:item.is_enabled}" v-for="(item,index) in isHighLightBenefit" :key="index" @click="chouseBenefit(item,index)">
        <div class="c-l">{{item | filterBenefitTitle}}</div>
        <div class="c-r"></div>
      </div>
      <div class="coupon-list hui" v-for="(item,index) in noHighLightBenefit" :key="item.jxc_benefit_name+index">
        <div class="c-l">{{item | filterBenefitTitle}}</div>
        <div class="c-r"></div>
      </div>
    </div>
    <!-- 优惠券 -->
    <div class="coupon-main yhq">
      <h3 class="title">优惠券</h3>
      <div class="coupon-list" :class="{hyqy:v.is_show,checkhyqy:v.is_enable}" v-for="(v,i) in isShowUserCoupon" :key="v.jxc_user_coupon_id" @click="chouseCoupon(v,i)">
        <div class="c-l">{{v.jxc_coupon_name}}</div>
        <div class="c-r"></div>
      </div>
      <div class="coupon-list hui" v-for="v in noShowUserCoupon" :key="v.jxc_user_coupon_id">
        <div class="c-l">{{v.jxc_coupon_name}}</div>
        <div class="c-r"></div>
      </div>
      <div class="addcoupo" @click="addUserCoupon()">
        <i class="add"></i>添加优惠券
      </div>
    </div>
    <div class="btnlayout">
      <div class="jiesuan act" @click="closeCouponSidebar">确定</div>
    </div>
  </div>
  <!-- 支付方式 -->
</div>
</template>

<script>
import Big from "big.js"
export default {
  data() {
    return {
      notMember: false, // 非会员
      carTypeList: {}, //车型大小
      license_name: '沪', // 车牌号
      license_zs: '',
      historyLicenseNumber: [], //历史洗车牌号
      historyLicenseNumberShow: false,
      historyWashCarList: '', // 洗车历史记录

      customPriceUse: false, // 开启自定义金额
      customPriceVisible: false, // 自定义金额弹窗
      shouhouVisible: false, // 售后弹窗
      shouhouValue: [],
      shouhouCoupon: '',
      shouhouPriceCouponList: [], // 售后服务列表

      offFreeDialogShow: false, // 体验券介绍弹窗
      offFreeTicket: [], // 体验券
      offFreeUse: false, // 使用体验券
      jxcServiceCatList: [], // 所有服务项目
      jxcAfterServiceList: [], // 售后服务
      tableData: [], // 选择的服务
      newBenefitTable: [], // 过滤掉使用权益后的服务表
      benefitMinPrice: 0, // 使用权益后的金额
      couponTotalPrice: 0, // 付款总额
      offPayMethod: '',

      userNickName: '', //用户昵称
      userTel: '', // 用户手机号
      userRankName: '', //级别
      userMoney: 0, // 账户余额
      userCoupon: [], // 用户拥有的优惠券
      userAfterCouponList: [], // 用户拥有的售后优惠券
      userBenefitList: [], // 用户拥有的权益
      useBalance: false, // 使用余额
      jxcUserBenefitName: '', // 权益名称
      jxcUserAccountList: [], // 会员卡列表
      showUserAccountList: false,
      carName: '',

      meituanTextShow: false, //
      allPayParams: {
        car_type_id: '1', // 汽车类型， 1表示小车，2表示大车
        cash_scan_result: '', // 扫码结果
        coupon_discount_fee: '', // 洗美券后总额
        jxc_user_account_id: '', // 会员卡
        jxc_admin_price: '', // 自定义金额
        jxc_admin_sms_code: '', // 自定义短信验证码
        jxc_after_service_list: [], // 售后服务项目
        jxc_order_price: 0, // 洗美实际总额（计入管理员自定义洗美金额）
        jxc_order_total_after_service_price: 0, // 售后服务总额
        jxc_order_price_with_after_service: 0, // 订单总额+售后服务总额
        jxc_seller_id: '', // 销售员ID
        jxc_user_after_coupon_list: '', // 售后优惠券
        jxc_user_benefit_list: [], // 勾选的权益
        jxc_user_coupon_list: '', // 优惠券
        jxc_user_dynamic_code: '6666', // 动态密码
        jxc_user_ticket_list: '', // 体验券号
        license_number: '', // 车牌号
        off_pay_amount: 0, // 线下支付金额
        off_pay_name: '', // 线下支付方式
        service_list: [], // 服务项目
        total_fee: 0, // 原总价
        use_admin_price: 0, // 自定义金额 1使用 0不使用
        use_user_account_amount: 1, //  是否使用余额 
        user_account_amount: 0, // 余额扣款金额
        user_name: '',
        jxc_seller_id: '',
        jxc_channel_id: '',
        third_part_coupon_sn: ''
      },
      fullscreenLoading: false,
      formLabelWidth: '120px',
      documentHeight: '', // 当前屏幕高度
      isShowJianpan: false, // 显示键盘
      isShowSidebar: true, //显示侧边栏
      isShowCoupon: false, //显示优惠券
      isShowPay: false, //显示支付// 
      xfMethods: [{
          img: require("@/assets/images/pay/new/wechat_act.png"),
          text: "微信",
          checked: false,
          type: 'wxpay_offline'
        },
        {
          img: require("@/assets/images/pay/new/alipay_act.png"),
          text: "支付宝",
          checked: false,
          type: 'alipay_offline'
        },
        {
          img: require("@/assets/images/pay/new/cash_act.png"),
          text: "现金",
          checked: false,
          type: 'cash_offline'
        },
        {
          img: require("@/assets/images/pay/new/union_pay.png"),
          text: "银行卡",
          checked: false,
          type: 'bank_offline'
        },
        {
          img: require("@/assets/images/pay/new/dazhong_act.png"),
          text: "大众点评",
          checked: false,
          type: 'dianping'
        },
        {
          img: require("@/assets/images/pay/new/meituan_act.png"),
          text: "美团",
          checked: false,
          type: 'meituan'
        }
      ]
    }
  },
  beforeMount() {
    this.documentHeight = document.documentElement.clientHeight || document.body.clientHeight
  },
  mounted() {
    let _this = this;
    let carMain = document.getElementById('carMain');
    carMain.style.height = Number(_this.documentHeight) - 318 + 'px';
    window.onresize = function () { // 定义窗口大小变更通知事件
      _this.documentHeight = document.documentElement.clientHeight || document.body.clientHeight //窗口高度
    }
  },
  methods: {
    // 选择权益
    chouseBenefit(item, index) {
      let currentServiceID = item.jxc_service_id
      let currentIndex = index
      let tiyanServiceID = this.offFreeTicket[0].jxc_service_id // 体验的服务ID
      if (this.offFreeUse) {
        this.userCoupon.forEach((v, i) => {
          if (v.service_list == tiyanServiceID) {
            v.is_show = false
          }
        })
      }
      if (item.is_enabled == true) {
        // 勾选的取消
        this.isHighLightBenefit[currentIndex]['is_enabled'] = false
      } else {
        // 未勾选的勾选
        this.isHighLightBenefit.forEach((benefitValue, benefitIndex, benefitArr) => {
          if (benefitValue.jxc_service_id == currentServiceID) {
            benefitValue.is_enabled = false
          }
          this.isHighLightBenefit[currentIndex]['is_enabled'] = true
        })
      }
      let benefitTable = JSON.parse(JSON.stringify(this.tableData))
      // 勾选的权益
      let checkBenefitArray = this.isHighLightBenefit.filter((v) => {
        return v.is_enabled == true
      })
      this.allPayParams.jxc_user_benefit_list = checkBenefitArray

      let removeBenefitTable = []
      let benefitPrice = 0
      benefitTable.forEach((benefitTableValue, benefitIndex) => {
        let jxcServiceID = benefitTableValue.jxc_service_id
        let count = benefitTableValue.count // 10
        let is_find = 0
        checkBenefitArray.forEach((checkBenefitQuan, checkIndex) => {
          if (jxcServiceID == checkBenefitQuan.jxc_service_id) {
            if (checkBenefitQuan.max_usage_count == '-1') {
              // 无限使用
              checkBenefitQuan.count = count
            } else {
              let surplusCount = checkBenefitQuan.max_usage_count - checkBenefitQuan.used_count // 剩余可以用的次数  10-2
              checkBenefitQuan.count = Math.min(count, surplusCount) // 取可用的次数最小值 min(10,8)
              if (checkBenefitQuan.count < count) { // 可用的权益次数小于table的次数  8 < 10
                let reducedBenefitTableValue = JSON.parse(JSON.stringify(benefitTableValue)) // 拷贝一份值
                reducedBenefitTableValue.count = count - checkBenefitQuan.count //  总数减去可以用的次数剩下不能用的次数 10-8 = 2 
                removeBenefitTable.push(reducedBenefitTableValue)
              }
            }
            benefitPrice = Big(benefitPrice).plus(Big(checkBenefitQuan.count * checkBenefitQuan.jxc_benefit_service_price)).toFixed(2)
            is_find = 1
          }
        })
        if (is_find == 0) {
          removeBenefitTable.push(benefitTableValue)
        }
      })

      this.newBenefitTable = removeBenefitTable // 过滤掉使用权益后的服务表
      let newBenefitTableID = []
      newBenefitTableID = removeBenefitTable.map((v) => {
        return v.jxc_service_id
      })
      this.resetUserCoupon(newBenefitTableID)
      this.benefitMinPrice = benefitPrice // 使用权益后的价格
      this.chouseCoupon()
    },
    // 点击选择优惠券
    chouseCoupon(item, indexTypeFour) {
      // type 4 兑换券
      if (typeof item != 'undefined') {
        if (item.jxc_coupon_type == 4) {
          let jxc_user_coupon_id = item.jxc_user_coupon_id
          this.userCoupon.forEach((userVal, i) => {
            if (userVal.jxc_user_coupon_id == jxc_user_coupon_id) {
              userVal.is_enable = userVal.is_enable ? false : true
            }
          })
          this.getUserCouponListString()
          return
        }
        // 除兑换券以外的优惠券
        item.is_enable = item.is_enable ? false : true
      }

      let isEnableList = []
      if (this.userCoupon.length > 0) {
        isEnableList = this.userCoupon.filter((userCouponValue) => {
          return userCouponValue.is_enable == true && userCouponValue.jxc_coupon_type != 4
        })
      }
      let tableData2 = this.tableData;
      let tiyanTable = JSON.parse(JSON.stringify(this.tableData))
      let tyServiceID = this.offFreeTicket[0].jxc_service_id

      // 开启体验
      if (this.offFreeUse) {
        let tiyanArray = [];
        tiyanTable.forEach((tiyanValue) => {
          if (tiyanValue.jxc_service_id != tyServiceID) {
            tiyanArray.push(tiyanValue)
          } else {
            tiyanValue.count--
            tiyanArray.push(tiyanValue)
          }
        })
        tableData2 = tiyanArray
      }
      // 使用权益
      if (this.allPayParams.jxc_user_benefit_list.length > 0) {
        tableData2 = this.newBenefitTable
      }

      let isClick = this.hasUseCoupon(tableData2, isEnableList)
      if (isClick) {
        let minprice = this.getCouponPrice(tableData2, isEnableList)
        this.couponTotalPrice = Big(minprice).toFixed(2)
      } else {
        let allCoupon = JSON.parse(JSON.stringify(isEnableList))
        // 当前点击的一项优惠券
        let myCoupon = allCoupon.filter((x, y) => {
          return x.jxc_user_coupon_id == item.jxc_user_coupon_id
        })
        // 除了自已其它的优惠券
        let otherCoupon = allCoupon.filter((x, y) => {
          return x.jxc_user_coupon_id != item.jxc_user_coupon_id
        })

        let min_temp_price = 0;
        let min_user_coupon_id = 0;
        otherCoupon.forEach((v, i) => {
          let newPerson = [];
          allCoupon.forEach((x, y) => {
            if (v.jxc_user_coupon_id != x.jxc_user_coupon_id) {
              newPerson.push(x)
            }
          })
          let isClick2 = this.hasUseCoupon(tableData2, newPerson)
          if (isClick2) {
            let tempPrice = this.getCouponPrice(tableData2, newPerson)
            if (min_temp_price == 0) {
              min_temp_price = tempPrice
              min_user_coupon_id = v.jxc_user_coupon_id
            } else {
              if (tempPrice < min_temp_price) {
                min_temp_price = tempPrice
                min_user_coupon_id = v.jxc_user_coupon_id
              }
            }
          }
        })
        isEnableList.forEach((v, i) => {
          if (v.jxc_user_coupon_id == min_user_coupon_id) {
            v.is_enable = false
          }
        })
        this.couponTotalPrice = Big(min_temp_price).toFixed(2)
      }

      if (this.isMemberMoney()) {
        console.log('yes')
      } else {
        console.log('no')
      }
      this.getUserCouponListString()
    },
    // 获取打钩的优惠券
    getUserCouponListString() {
      let jxc_user_coupon_id_list = []
      for (let v of this.userCoupon) {
        if (v.is_enable) {
          jxc_user_coupon_id_list.push(v.jxc_user_coupon_id)
        }
      }
      this.allPayParams.jxc_user_coupon_list = jxc_user_coupon_id_list.join(',')
    },
    // 计算最优价 [选择的服务 || 当前选择的优惠券 ]
    getCouponPrice(serviceArray, choiceCouponsArray) {
      let self = this;
      let copychoiceCouponsArray = JSON.parse(JSON.stringify(choiceCouponsArray))
      let copyServiceArray = JSON.parse(JSON.stringify(serviceArray))
      if (copychoiceCouponsArray.length == 0) {
        let defaultPrice = 0;
        copyServiceArray.forEach((item, index) => {
          defaultPrice = Big(defaultPrice).plus(Big(item.format_discount_price2 * item.count)).toFixed(2)
        })
        return defaultPrice
      } else {
        let item = copychoiceCouponsArray[0]; // sever_list
        let selectId = item.service_list.split(",") // 转[1,2,3]
        copychoiceCouponsArray.shift();
        let min_temp_price = 0;
        let min_service_id = 0;
        selectId.forEach((v, i) => {
          let kickServiceArray = []
          let hasService = 0
          let tempPrice = 0
          let addRate
          let format_discount_price2 = 0
          let tmp_x
          copyServiceArray.forEach((item2, index) => {
            // 券对应的服务id相等
            if (v == item2.jxc_service_id) {
              hasService = 1
              addRate = item2.jxc_suv_coef
              format_discount_price2 = item2.format_discount_price2
            }
          })
          if (hasService == 1) {
            copyServiceArray.forEach((x, y) => {
              if (x.jxc_service_id != v) {
                kickServiceArray.push(x)
              } else {
                if (x.count > 1) {
                  tmp_x = JSON.parse(JSON.stringify(x))
                  tmp_x.count--
                  kickServiceArray.push(tmp_x)
                }
              }
            })

            let ktValue = self.hasUseCoupon(kickServiceArray, copychoiceCouponsArray)
            if (ktValue) {
              tempPrice = parseFloat(self.getCouponPrice(kickServiceArray, copychoiceCouponsArray))
              switch (item.jxc_coupon_type) {
                case 1:
                  break;
                case 2:
                  break;
                case 3:
                  // 定价券
                  if (self.allPayParams.car_type_id == 1) {
                    tempPrice = Big(tempPrice).plus(Big(item.price)).toFixed(2)
                  } else {
                    // 大车定价券
                    let addPrice = Math.round(Big(addRate).times(item.price).toFixed(2)) // times * | plus +
                    let newPrice = Big(addPrice).plus(item.price).toFixed(2)
                    tempPrice = Big(tempPrice).plus(Big(newPrice)).toFixed(2)
                  }
                  break;
                case 4:
                  break;
                case 5:
                  // 抵用券
                  let diyonghouPrice = Big(format_discount_price2).minus(Big(item.price2)).toFixed(2)
                  if (diyonghouPrice <= 0) {
                    diyonghouPrice = 0
                  }
                  tempPrice = Big(tempPrice).plus(Big(diyonghouPrice)).toFixed(2)
                  break;
              }
              if (min_temp_price == 0) {
                min_temp_price = tempPrice
                min_service_id = v
              } else {
                if (Number(tempPrice) < Number(min_temp_price)) {
                  min_temp_price = tempPrice
                  min_service_id = v
                }
              }
            }
          }
        })
        return min_temp_price
      }
    },
    // 判断优惠券是否可用 【 服务 || 选择的优惠券 】
    hasUseCoupon(serviceArray, choiceCouponsArray) {
      let copychoiceCouponsArray = JSON.parse(JSON.stringify(choiceCouponsArray)) // 复制选中的优惠券列表
      let copyServiceArray = JSON.parse(JSON.stringify(serviceArray)) // 复制选中的服务
      let kickServiceArray = []
      let isTrue = false;
      if (copychoiceCouponsArray.length == 0) {
        return true
      } else {
        let item = copychoiceCouponsArray[0]; // 选第一个优惠券
        let selectId = item.service_list.split(",") // 优惠券转成['4','7','12']
        copychoiceCouponsArray.shift(); // 删除优惠券列表的一个
        selectId.forEach((v, i) => { // 循环一张卷里面的每一项
          let hasService = 0
          copyServiceArray.forEach((item, index) => {
            if (v == item.jxc_service_id) { // 卷的值与服务的id相匹配
              hasService = 1
            }
          })
          if (hasService == 1) { // 如果卷的有相等
            copyServiceArray.forEach((x, y) => {
              if (x.jxc_service_id != v) { // 踢掉相等的一个服务
                kickServiceArray.push(x)
              } else {
                if (x.count > 1) {
                  x.count--
                  kickServiceArray.push(x)
                }
              }
            })
            let isScreenTrue = this.hasUseCoupon(kickServiceArray, copychoiceCouponsArray) // selectArray 砍掉第一个
            if (isScreenTrue) {
              isTrue = true;
            }
          }
        })
        return isTrue
      }
    }
  },
  watch: {
    'documentHeight': function (val) { //监听屏幕高度变化
      let carMain = document.getElementById('carMain');
      carMain.style.height = Number(val) - 318 + 'px'; //'otherHeight'是页面布局调整，可去除
    },
    '$route': {
      immediate: true,
      handler() {
        this.init()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.consume {
  display: flex;

  .shop-l {
    border-radius: 8px;
    flex: 1;
    margin-right: 15px;
    background: #fff;
    overflow: hidden;

    .search {
      height: 90px;
      border-bottom: 1px solid #E3E7EE;
      display: flex;
      justify-items: center;
      align-items: center;

      .search-l {
        flex: 1;
        padding-left: 25px;
      }

      .search-r {
        flex: 0 0 135px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;

      }

    }

    .car-main {
      padding: 15px 0 0 15px;
      height: 350px;
      overflow: auto;

      .zwservice {
        padding-top: 50px;
        font-size: 20px;
        text-align: center;
        color: #C6CAD2;
      }

      li {
        width: 145px;
        overflow: hidden;
        float: left;
        border: 1px solid #E2E6EF;
        border-radius: 8px;
        margin-right: 15px;
        margin-bottom: 15px;
        cursor: pointer;

        .title {
          padding: 10px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          text-align: center;
        }

        .price {
          background-color: #E2E6EF;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 20px;
        }
      }

      .act {
        border: 1px solid #1890FF;

        .price {
          background-color: #1890FF;
          color: #fff;
        }
      }

    }

    .car-footer {
      height: 198px;
      box-shadow: 4px 0 10px 0 #E9EEF9;

      .zwsp {
        line-height: 198px;
        text-align: center;
        font-size: 20px;
        color: #C6CAD2;
      }

      .selectshop {
        .shop-list {
          height: 144px;
          overflow: auto;

          li {
            display: flex;
            height: 48px;
            line-height: 48px;
            border-bottom: 1px solid #E3E7EE;
            font-size: 20px;

            >div {
              flex: 1;
            }

            >div:first-child {
              flex: 2;
              padding-left: 30px;

            }

            .el-icon-remove-outline {
              font-size: 22px;
              color: #A6AFC0;
              cursor: pointer;
            }

            .use {
              color: #1890FF;
            }

            .el-icon-circle-plus-outline {
              font-size: 22px;
              color: #1890FF;
              cursor: pointer;
            }

            .count {
              display: inline-block;
              width: 30px;
              text-align: center;
            }
          }

          li:last-child {
            border: none;
          }
        }

        .shop-clear {
          border-top: 1px solid #E3E7EE;
          height: 48px;
          line-height: 48px;
          font-size: 20px;
          color: #C6CAD2;
          text-align: center;
          cursor: pointer;
        }
      }

    }
  }

  .member-r {
    flex: 0 0 440px;
    border-radius: 8px;
    background: #fff;
    overflow: hidden;

    .m-login {
      padding: 15px 0;
      background-color: #002140;

      .m-login-main {
        width: 382px;
        margin: 0 auto;

        .m-list {
          width: 380px;
          height: 44px;
          background: #173654;
          border: 1px solid #335A7F;
          border-radius: 27.5px;
          position: relative;
          margin-bottom: 15px;

          .city {
            position: absolute;
            left: 30px;
            top: 10px;
            width: 65px;
            border-right: 1px solid #335A7F;
            cursor: pointer;

            .linces {
              font-size: 16px;
              color: #fff;
            }

            .jt {
              background: url('~@/assets/images/index/icon_arrow.png') 0 0 no-repeat;
              width: 16px;
              height: 9px;
              display: block;
              background-size: 100%;
              position: absolute;
              left: 30px;
              top: 6px;
            }

          }

          .selectlicense {
            width: 265px;
            position: absolute;
            left: 100px;
            top: 50px;
            z-index: 10;

            .topbg {
              font-size: 0;
            }

            .mainbg {
              background: url('~@/assets/images/index/licbg2.png') 0 0 repeat-y;
              max-height: 200px;
              overflow-y: auto;

              li {
                font-size: 16px;
                color: #fff;
                line-height: 30px;
                padding-left: 20px;
                cursor: pointer;
              }
            }
          }

          .wf-text {
            outline: none;
            background: transparent;
            height: 44px;
            line-height: 44px;
            width: 280px;
            position: absolute;
            left: 100px;
            color: #fff;
            font-size: 16px;
            padding-left: 20px;
          }

          ::-webkit-input-placeholder {
            color: #fff;
            font-size: 16px;
            letter-spacing: 0;
            text-align: left;
          }

          :-moz-placeholder {
            color: #fff;
            font-size: 16px;
            letter-spacing: 0;
            text-align: left;
          }

          ::-moz-placeholder {
            color: #fff;
            font-size: 16px;
            letter-spacing: 0;
            text-align: left;
          }

          :-ms-input-placeholder {
            color: #fff;
            font-size: 16px;
            letter-spacing: 0;
            text-align: left;
          }
        }

        .cartype {
          display: flex;

          .title {
            flex: 0 0 140px;
            color: #fff;
            font-size: 16px;
            text-align: right;
            padding-right: 10px;
          }

          .type {
            flex: 1;
          }

          .el-radio {
            color: #fff;
          }
        }
      }

    }

    .m-price {
      padding-top: 10px;

      .user {
        width: 420px;
        margin: 0 auto;
        padding: 10px 15px;
        border: 1px dashed #E3E7EE;
        border-radius: 8px;

        .u-list {
          display: flex;

          .u-l {
            flex: 1;

            .person {
              background: url('~@/assets/images/index/person.png') 0 3px no-repeat;
              padding-left: 28px;
              font-size: 18px;
              color: #002140;

              .grade {
                font-size: 14px;
                color: #A6AFC0;
              }
            }

            .jxc {
              li {
                font-size: 14px;
                color: #A6AFC0;
                line-height: 24px;
              }
            }
          }

          .u-r {
            flex: 1;

            .tel {
              height: 30px;
              text-align: right;
              font-size: 18px;

              .icon {
                display: inline-block;
                background: url('~@/assets/images/index/tel.png') 0 0 no-repeat;
                width: 18px;
                height: 18px;

                margin-right: 5px;

              }

            }
          }

        }

        .balance {
          font-size: 20px;
          color: #01295F;
          text-align: right;
        }

      }

      .u-price {
        border-bottom: 1px solid #E3E7EE;
        display: flex;
        align-items: center;
        height: 50px;

        .u-l {
          flex: 1;
          font-size: 20px;
          color: #063266;
          padding-left: 30px;
        }

        .u-r {
          padding-right: 30px;
          flex: 1;
          font-size: 20px;
          color: #063266;
          text-align: right;
        }

        .discount {
          color: #FE1F3B;
        }
      }

      .u-shishou {
        border-bottom: 1px solid #E3E7EE;

        .name {
          font-size: 18px;
          color: #A6AFC0;
          text-align: center;
          padding-top: 10px;
        }

        .price {
          font-size: 46px;
          color: #01295F;
          text-align: center;
          font-weight: 700;
          padding-bottom: 8px;
        }
      }

      .u-coupon {
        height: 50px;
        border-bottom: 1px solid #E3E7EE;
        background: #F5F7FB;
        display: flex;
        align-items: center;
        cursor: pointer;

        .name {
          flex: 1;
          padding-left: 70px;
          font-size: 20px;
          color: #01295F;

          .textr {
            float: right;
            padding-right: 10px;
          }

        }

        .jt {
          flex: 0 0 50px;
          height: 78px;
          background: url('~@/assets/images/index/jt.png') 0 30px no-repeat;
        }

      }

      .look {
        .name {
          background: url('~@/assets/images/index/coupon.png') 30px 3px no-repeat;
        }
      }

      .zdy {
        .name {
          height: 28px;
          background: url('~@/assets/images/index/calculator.png') 30px 0 no-repeat;
        }
      }

      .pay {
        .name {
          height: 28px;
          background: url('~@/assets/images/index/pay.png') 30px 0 no-repeat;
        }
      }

    }

    .btnlayout {
      padding: 15px 20px;
      cursor: pointer;

      .jiesuan {
        height: 60px;
        line-height: 60px;
        background-color: #D2D6DC;
        border-radius: 42px;
        font-size: 28px;
        color: #FFFFFF;
        text-align: center;
      }

      .act {
        background-color: #1890FF;
      }

    }
  }

  .coupon-main {
    .title {
      background: #F5F7FB;
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      color: #002140;
      text-align: center;
      border-bottom: 1px solid #E3E7EE;

      .el-icon-question:before {
        font-size: 26px;
        color: #f60;
        cursor: pointer;
      }
    }

    .coupon-list {
      display: flex;
      height: 64px;
      align-items: center;
      border-bottom: 1px solid #E3E7EE;
      font-size: 20px;

      .c-l {
        flex: 1;
        padding-left: 70px;
        color: #01295F;
        height: 32px;
      }

      .c-r {
        flex: 0 0 70px;
        background: url('~@/assets/images/index/checkdiable.png') 0 0 no-repeat;
        width: 32px;
        height: 32px;
      }

    }

    .hyqy {
      cursor: pointer;

      .c-r {
        flex: 0 0 70px;
        background: url('~@/assets/images/index/check.png') 0 0 no-repeat;
        width: 32px;
        height: 32px;
      }

    }

    .checkhyqy {
      .c-r {
        flex: 0 0 70px;
        background: url('~@/assets/images/index/checked.png') 0 0 no-repeat;
        width: 32px;
        height: 32px;
      }

    }

    .hui {
      .c-l {
        color: #C6CAD2;
      }
    }

    .addcoupo {
      width: 400px;
      height: 60px;
      border: 1px dashed #01295F;
      margin: 10px auto;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #01295F;
      cursor: pointer;

      .add {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        background: url('~@/assets/images/index/add.png') 0 0 no-repeat;
      }
    }
  }

  .xiaofei {
    .coupon-list {
      align-items: center;
      justify-content: center;

      .c-l {
        padding-left: 30px;

        img {
          width: 32px;
          height: 32px;
          margin-right: 10px;
          vertical-align: -8px;
        }
      }

      .meituanquan {
        width: 80%;
        height: 50px;
        padding: 0 10px;
        line-height: 50px;
        margin: 0 auto;
        background-color: #EEEEEE;
        font-size: 20px;
      }
    }
  }

  .coupon {
    .coupon-list {
      .c-l {
        background: url('~@/assets/images/index/qy.png') 30px -4px no-repeat;
      }
    }
  }

  .coupon {
    .hui {
      .c-l {
        background: url('~@/assets/images/index/qy_hui.png') 30px -4px no-repeat;
      }
    }
  }

  .tiyan {
    .c-l {
      background: url('~@/assets/images/index/tiyan.png') 30px 0 no-repeat;
    }
  }

  .yhq {
    .coupon-list {
      .c-l {
        background: url('~@/assets/images/index/yhj.png') 30px -4px no-repeat;
      }
    }
  }

  .yhq {
    .hui {
      .c-l {
        background: url('~@/assets/images/index/yhj_hui.png') 30px -4px no-repeat;
      }
    }
  }

}

.w100 {
  width: 100px;
}
</style>
