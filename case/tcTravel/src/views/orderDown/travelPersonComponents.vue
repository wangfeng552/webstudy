<template>
    <div class="tourist-info bg">
        <div class="remind" v-show="!details.isRealName && !!details.isNeedIdCard && index == 0">该票型只需提供一个身份证即可</div>
        <div class="input-info">
          <span>
            出游人
          </span>
          <input type="text" v-model="traveler.travelername"  placeholder="姓名">
        </div>
        <div class="input-info">
          <span>
            手机号
          </span>
          <input type="text" v-model="traveler.travelermobile"  placeholder="用于接收确认短信">
        </div>

        <!-- isRealName => true; isNeedIdCard=> true 全部都需要身份证 -->
        <!-- isRealName => false; isNeedIdCard=> true  只需要一个身份证 -->
        <!-- isRealName => true; isNeedIdCard=> false  全部隐藏身份证 -->
        <!-- isRealName => false; isNeedIdCard=> false  只需要提供一个信息, 而且不需要身份证 -->
        <div class="input-info no-border" v-show="(!!details.isRealName && !!details.isNeedIdCard) || (!details.isRealName && !!details.isNeedIdCard && index == 0)">
          <span>
            身份证
          </span>
          <input type="text" v-model="traveler.traveleridcardno"  placeholder="用于景点凭证">
        </div>
    </div>
</template>
<script>
export default {
  props: ["traveler", "details", "index"],
  data() {
    return {};
  },
  computed: {},

  methods: {
    optScreening(obj) {
      this.$emit("selectScreening", obj);
    }
  }
};
</script>