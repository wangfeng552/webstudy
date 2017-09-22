<template>
	<div class="typeline">
		<div class="leftshouru">({{index+1}})&nbsp;{{message.title}}</div>
		<p class="beizhu">{{message.describe}}</p>
		<label class="am-radio am-secondary" v-for="item2 in message.value">
		  <input type="radio" name="radio3" value="" data-am-ucheck> {{item2}}
		</label>
	</div>
</template>
<script>
    export default{
        name: 'radio',
        props:['message','index']
    }
</script>