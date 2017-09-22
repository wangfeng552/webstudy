<template>
	<div>
		<div class="chartinputCont chartselect">
			<div class="itemsP">
    			<span class="itemsLeft">问题类型：</span>
				<input type="text" placeholder="下拉" class="chartinputTitle" v-model="message.title">
    		</div>
			<select class="selectName">
			  <option value="a"  v-for="(option,index) in message.value">{{message.value[index]}}</option>
			</select>
			<ul class="checkList">
				<li v-for="(option,index) in message.value" class="lisTto" v-bind:index="index">
					<span class="icon-checkbox"></span>
					<input type="text" class="optionOne" v-model="message.value[index]">
					<span class="optionDel" @click="deloption(index)">删除</span>
				</li>
			</ul>
			<span class="addOption" @click="addoption">添加选项卡</span>
			<div class="operation">
				<div class="optionLeft">
					<label class="am-checkbox am-secondary">
					  <input type="checkbox" value="" data-am-ucheck>必填
					</label>
				</div>
				<div class="optionRight">
					<span class="del" @click="delLastOne">删除</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    export default{
        name:'chartselect',
        props:['message', 'parent', 'index'],
        data: function() {
        	return {
        		
        	}
        },
        methods:{
        	delLastOne(){
        		this.parent.splice(this.index, 1)
        		window.localStorage.setItem('items', JSON.stringify(this.parent))
        	},
        	addoption(){
        		this.message.value.push("选项值")
        	},
        	deloption(index){
        		this.message.value.splice(index, 1)
        	}
        }
      }
</script>