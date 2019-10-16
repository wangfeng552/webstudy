<template>
	<div class="preview" ref="two">
		<div class="warning_tips" v-show="warning_tips">
			<img src="../../../assets/images/create/huangsejinggao.png" height="32" width="32">
			<!-- <p class="miaoshu">{{summary}}</p> -->
		</div>
		<div class="formContent">
			<component v-for="(item,i) in listData" v-bind:message="item" v-bind:index="i" :is="'p' + item.type" :key="item"></component>
		</div>
		<div class="tuichu" ref="tuichu">
			<router-link  :to="{name:'formcreate'}">
				<button class="submit">退出预览</button>
			</router-link>
		</div>
		<div>{{gery}}</div>
	</div>
</template>
<script>
  import pchartinput from 'components/formassembly/input.vue'
  import pchartcheckbox from 'components/formassembly/checkbox.vue'
  import pchartradio from 'components/formassembly/radio.vue'
  import pchartdate from 'components/formassembly/date.vue'
  import pcharttextarea from 'components/formassembly/textarea.vue'
  import pchartupload from 'components/formassembly/upload.vue'
  export default {
  	name:'app',
  	props:['message'],
	components:{
	   	 pchartinput , pchartcheckbox , pchartradio , pchartdate ,pcharttextarea  ,pchartupload
	},
	data(){
		return{
			listData:'',
			summary:'',
			id:'',
			warning_tips:true
		}
	},
	created(){
		this.id = this.$route.params.id
		console.log(this.id)
		this.listData = JSON.parse(window.localStorage.getItem('items'))
		this.summary = JSON.parse(window.localStorage.getItem('summary'))
	},
	computed:{
		gery(){
			if (this.summary == "") {
				this.warning_tips = false
			}
		}
	}
  }
</script>