<template>
	<div>
    	<div class="chartinputCont danhangchart">
            <div class="chartTop">
                <span class="topIndex">问题{{index+1}}</span>
                <span class="cha" @click="delLastOne">
                    <img src="../../assets/images/create/cha.png" height="12" width="12">
                </span>
            </div>
            <div class="bigBox">
                <div class="itemsP">
                    <span class="itemsLeft">问题类型：</span>
                    <span class="itemsLeft2">上传文件</span>
                    <label class="am-checkbox am-secondary">
                      <input type="checkbox" v-model="checked" @click="addGuize">必填
                    </label>
                </div>
                <div class="itemsP">
                    <span class="itemsLeft">标题：</span>
                    <input type="text" class="chartinputText" placeholder="请输入标题" v-model="message.title">
                </div>
                <div class="itemsP">
                    <span class="itemsLeft">备注：</span>
                    <textarea class="describe" v-model="message.describe"></textarea>
                </div>
            </div>
		</div>
	</div>
</template>
<script>
    export default{
        name:'chartinput',
        props:['message', 'parent', 'index'],
        methods:{
            // 删除当前项
        	delLastOne(){
        		this.parent.splice(this.index, 1)
        		window.localStorage.setItem('items', JSON.stringify(this.parent))
        	},
            // 必填往items里增加required
            addGuize(){
                if (this.checked == true) {
                    this.message.rules.push('required')
                }else{
                    this.message.rules.splice('required')
                }
            }
        }
      }
</script>