<template>
	<div class="mainpart">
		<p class="qiyejihuo">修改密码</p>
		<div class="revise-box">
			<img src="./images/success.png" class="success">
			<p class="one">密码修改成功</p>
			<p class="two">请牢记你的密码，<i>{{time}}</i>秒后自动跳转到登录页面</p>
			<p class="three" @click="login" style="cursor: pointer;">马上登录>></p>
		</div>
	</div>
</template>
<script>
	import timerBtn from '../login/timerBtn.vue'
	export default{
    	data() {
	      return {
	        time:5
	      }
	    },
	    created(){
	      this.timeOut()
	    },
	    methods:{
	      timeOut(){
	        if (this.time > 0) {
	          this.time--;
	          setTimeout(this.timeOut, 1000);
	        }else{
	        	this.$store.dispatch('logout').then(()=>{
	                window.localStorage.removeItem('items');
	                this.isShow = false
	           })
	          this.$router.push({name:'login' })
	        }
	      },
	      login(){
	      	this.$store.dispatch('logout').then(()=>{
	            window.localStorage.removeItem('items');
	        })
	        this.$router.push({name:'login' })
	      }
	    }
	  }
</script>
<style>
.revise-box{
	padding:98px 0 144px 0;
	width: 1048px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #e2e2e2;
    text-align: center;
}
.qiyejihuo{
	width: 1048px;
	margin: 0 auto 10px;
	font-size: 16px;
	height: 20px;
	padding-left: 10px;
	border-left: 5px solid #3c8ced;
}
.success{
	display: block;
	margin: 0 auto;
}
.one{
	font-size: 15px;
	color:#1b1b1b;
	margin-top: 20px;
}
.two,.three{
	margin-top: 20px;
	font-size: 14px;
}
.two{
	color: #5c5c5c;
}
.three{
	color: #0c57bd;
}
</style>
