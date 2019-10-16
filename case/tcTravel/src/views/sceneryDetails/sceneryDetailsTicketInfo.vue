<template>
	<div class="scenery-details-ticket-info main-content">
		<header-fix fixed :title="title"></header-fix>
		<div class="main">
			<div class="s-d-t-i-i"><span></span><span>取票方式</span></div>
			<div class="s-d-t-i-b">
				{{details.getTicketMode}}
			</div>
			<div class="s-d-t-i-i"><span></span><span>包含项目</span></div>
			<div class="s-d-t-i-b">
				{{details.containedItems}}
			</div>
			<div class="s-d-t-i-i"><span></span><span>温馨提示</span></div>
			<div class="s-d-t-i-b" v-html="details.ticketPriceRemark">
			</div>
		</div>
		<!-- <div class="book-now" @click="goMakeOrder(details)">在线预订</div> -->
	</div>
</template>
<script>
import headerFix from "../../components/header";
export default {
  name: "sceneryDetailsTicketInfo",
  data() {
    return {
      title: "票型说明",
      details: {
        getTicketMode: "",
        containedItems: "",
        ticketPriceRemark: ""
      }
    };
  },
  created() {
   // this.details = JSON.parse(decodeURIComponent(this.$route.query.details));
    this.details = this.$route.query.details;
  },
  components: {
    headerFix
  },
  methods: {
    goMakeOrder: function(par) {
      let data = this.$route.query.data;
      let orderPar = {
        isReMark: par["isReMark"],
        ticketPriceRemark: par["ticketPriceRemark"],
        ticketPriceId: par["ticketPriceId"],
        ticketName: par["ticketName"],
        tcAmountPrice: par["tcAmountPrice"],
        isScreening: par["isScreening"],
        isRealName: par["isRealName"],
        reservecheckWay: par["reservecheckWay"],
        IsPost: par["IsPost"],
        ruYuanVoucher: data["ruYuanVoucher"],
        sceneryId: data['sceneryId'],
      };
      // 由于reminder 由于内容太多    导致跳转登陆页面失败,所以保存在本地
      // localStorage.setItem("reminder", data["reminder"]);
      this.$router.push({ path: "/make-order", query: { details: JSON.stringify(orderPar) } });
    }
  }
};
</script>
<style lang="scss" scoped>
.s-d-t-i-i {
  display: flex;
  align-items: center;
  span:nth-child(1) {
    border-left: solid 2px #dabb6f;
    height: 0.21rem;
    display: inline-block;
    margin-right: 10px;
  }
  span:nth-child(2) {
    color: #dabb6f;
    font-size: 0.28rem;
  }
}

.main {
  padding: 20px 10px 10px 10px;
}

body {
  background: #ffffff;
}

.s-d-t-i-b {
  padding-left: 10px;
  font-size: 0.24rem;
  margin: 10px 0;
}

.book-now {
  position: fixed;
  right: 0;
  bottom: 1rem;
  background: #d7b667;
  color: #fff;
  border-radius: 0.8rem;
  font-size: 0.3rem;
  left: 0;
  width: 3rem;
  text-align: center;
  margin: auto;
  line-height: 0.8rem;
}

.main-content {
  position: absolute;
  background: #ffffff;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}
</style>