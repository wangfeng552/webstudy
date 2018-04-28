<template>
	<div class="scenery-details-ticket-info main-content">
		<header-fix fixed :title="title"></header-fix>
		<div class="main">
			
			<div v-if="userNotes.businessHours">
				<div class="s-d-t-i-i"><span></span><span>开放时间</span></div>
				<div class="s-d-t-i-b">
					{{userNotes.businessHours}}
				</div>
			</div>
			
			<div v-if="userNotes.favouredPolicy">
				<div class="s-d-t-i-i"><span></span><span>特惠政策</span></div>
				<div class="s-d-t-i-b">
					{{userNotes.favouredPolicy}}
				</div>
			</div>
			
			<div v-if="userNotes.reminder">
				<div class="s-d-t-i-i"><span></span><span>温馨提示</span></div>
				<div class="s-d-t-i-b">
					{{userNotes.reminder}}
				</div>
			</div>
			
			<div v-if="sceneryTrafficGuide">
				<div class="s-d-t-i-i"><span></span><span>交通信息</span></div>
				<div class="s-d-t-i-b">
					{{sceneryTrafficGuide}}
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
import headerFix from "../../components/header";
export default {
  name: "sceneryDetailsTicketInfo",
  data() {
    return {
      title: "预订须知",
      userNotes: {
        businessHours: "",
        reminder: "",
        sceneryTrafficGuide: "",
        favouredPolicy:""
      },
      sceneryTrafficGuide:""
    };
  },
  created() {
    let data = this.$route.query.data;
    this.userNotes = data.userNotes;
    this.sceneryTrafficGuide =data.sceneryTrafficGuide;
  },
  components: {
    headerFix
  },
  methods: {
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


.s-d-t-i-b {
  padding-left: 10px;
  font-size: 0.24rem;
  margin: 10px 0;
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