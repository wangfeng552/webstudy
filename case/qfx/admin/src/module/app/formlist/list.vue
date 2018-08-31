<template>
	<div id="app">
		<whiteHeader></whiteHeader>
		<div class="name3">{{submitShow.name}}</div>
    <div class="listContent">
      <component v-for="(item,key,index) in sub2" v-bind:is="item.type" v-bind:message="item"></component>
    </div>
    <router-link :to="{name:'formindex'}">
          <button class="submitBack">返回</button>
      </router-link>   
	</div>
</template>
<script>
  import whiteHeader from 'components/whiteHeader.vue'
  import chartinput from 'components/input.vue'
  import chartcheckbox from 'components/checkbox.vue'
  import chartradio from 'components/radio.vue'
  import chartdate from 'components/date.vue'
  import charttextarea from 'components/textarea.vue'
  import chartselect from 'components/select.vue'
  import chartupload from 'components/upload.vue'

  import API from 'API/config'

  export default {
    data(){
        return {
	    	    id:'',
            submitShow:{},
            sub2:[]
        }
      },
      beforeRouteEnter (to, from, next) {
        next(vm => {
          vm.id = to.params.id
        })
      },
      watch: {
        '$route':'gitId'
      },
    	components:{
    	   	whiteHeader , chartinput , chartcheckbox , chartradio , chartdate , charttextarea , chartselect ,chartupload
    	},
    	created(){
        this.id = this.$route.params.id
      		this.$http.get(API.url+'admin/service/chart/'+this.id
      		).then((res)=>{
              	this.submitShow = res.data.content
                this.sub2 = res.data.content.items
          	})
      	}
       }
</script>
