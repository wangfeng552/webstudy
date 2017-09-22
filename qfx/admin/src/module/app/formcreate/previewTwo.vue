<template>
	<div class="preview" ref="two">
		<div class="warning_tips" v-show="warning_tips">
			<img src="../../../assets/images/create/huangsejinggao.png" height="32" width="32">
			<p class="miaoshu" v-if="summary" v-html="summary"></p>
		</div>
		<div class="formContent">
			<component v-for="(item,i) in listData" v-bind:message="item" v-bind:index="i" :is="'p' + item.type"></component>
		</div>
		<div class="tuichu" ref="tuichu">
			<router-link  :to="{name:'formdetails',params:{id:id}}">
				<button class="submit">退出预览</button>
			</router-link>
		</div>
		<div>{{gery}}</div>
	</div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import pchartinput from 'components/input.vue'
  import pchartcheckbox from 'components/checkbox.vue'
  import pchartradio from 'components/radio.vue'
  import pchartdate from 'components/date.vue'
  import pcharttextarea from 'components/textarea.vue'
  import pchartselect from 'components/select.vue'
  import pchartupload from 'components/upload.vue'
  import pcharttime from 'components/time.vue'
  export default {
  	name:'app',
  	props:['message'],
	components:{
	   	 pchartinput , pchartcheckbox , pchartradio , pchartdate ,pcharttextarea , pchartselect ,pchartupload,pcharttime
	},
	data(){
		return{
			id:'',
			summary:'',
			warning_tips:true,
			listData:''
		}
	},
	created(){
		this.id = this.$route.params.id
		this.listData = this.details_zr
	},
	computed:{
		...mapGetters(['details_zr']),
		...mapGetters(['formtop_zr']),
		gery(){
			if (this.formtop_zr.summary == "" || this.formtop_zr.summary == null) {
				this.warning_tips = false
			}else{
				this.summary = this.formtop_zr.summary
				this.summary = this.formtop_zr.summary.replace(/(?:\r\n|\r|\n)/g, '<br />'); 
			}
			
		}
	}
  }
</script>