<template>
	<div class="icon" :class="classMap[supports[0].type]">icon</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				supports:[
					{type:0,name:"沾上干"},
					{type:1,name:"sdaf"},
					{type:2,name:"dhdfhfhg"},
				]
			}
		},
		created() {
			this.classMap=['a1','a2','a3']
		}
	}
</script>
<style type="text/css">
	.a1{font-size: 20px}
	.a2{font-size: 50px}
	.a3{font-size: 60px}
</style>

 <!-- 显示不同的ico -->