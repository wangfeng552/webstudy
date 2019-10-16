<template>
	<div class="typeline">
		<div class="leftshouru">({{index+1}})&nbsp;{{message.title}}</div>
		<select class="selectName">
		  <option value="a"  v-for="(option,index) in message.value">{{message.value[index]}}</option>
		</select>
	</div>
</template>
<script>
    export default{
        name: 'select2',
        props:['message','index']
    }
</script>