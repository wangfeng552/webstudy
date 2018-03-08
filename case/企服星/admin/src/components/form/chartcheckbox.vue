<template>
	<div>
		<div class="chartinputCont chartcheckboxCont">
            <div class="chartTop">
                <span class="topIndex">问题{{index+1}}</span>
                <span class="cha" @click="delLastOne">
                    <img src="../../assets/images/create/cha.png" height="12" width="12">
                </span>
            </div>
            <div class="bigBox">
                <div class="itemsP">
                    <span class="itemsLeft">问题类型：</span>
                    <span class="itemsLeft2">复选</span>
                    <label class="am-checkbox am-secondary">
                      <input type="checkbox" v-model="checked" @click="addGuize">必填
                    </label>
                </div>
                <div class="itemsP">
                    <span class="itemsLeft">标题：</span>
                    <textarea class="describe" placeholder="请输入标题" v-model="message.title" @blur="inputBlur"></textarea>
                    <div class="errormessage" v-show="errorinfo">请输入内容</div>
                </div>
                <div class="itemsP">
                    <span class="itemsLeft">备注：</span>
                    <textarea class="describe2" v-model="message.describe"></textarea>
                </div>
                 <div class="itemsP">
                    <span class="itemsLeft">选项：</span>
                    <ul class="checkList">
                        <li v-for="(option,index) in message.value" class="lisTto" v-bind:index="index">
                            <input type="text" class="optionOne" v-model="message.value[index]">
                            <span class="optionDel" @click="deloption(index)">删除选项</span>
                        </li>
                    </ul>
                    <div class="addOption" @click="addoption">添加选项</div>
                </div>
                <div>{{checkboxShow}}</div>
            </div>
		</div>
	</div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default{
        name:'chartcheckbox',
        props:['message', 'parent', 'index'],
        data() {
        	return {
        		checked:false,
                errorinfo:false
        	}
        },
        computed:{
            checkboxShow(){
                this.message.rules.forEach((v)=>{
                    if (v == 'required') {
                        this.checked = true
                    }            
                })
            }
        },
        cerated(){

        },
        methods:{
            // 删除当前项
        	delLastOne(){
        		this.parent.splice(this.index, 1)
        		window.localStorage.setItem('items', JSON.stringify(this.parent))
        	},
            // 增加选项值
        	addoption(){
        		this.message.value.push("")
        	},
            // 删除选项值
        	deloption(index){
        		this.message.value.splice(index, 1)
        	},
            // 必填往items里增加required
            addGuize(){
                if (this.checked == true) {
                    this.message.rules.push('required')
                }else{
                    this.message.rules.splice('required')
                }
                window.localStorage.setItem('check2', JSON.stringify(this.checked))
            },
            inputBlur(){
                if (this.message.title == '') {
                    this.errorinfo = true
                    return false
                }else{
                    this.errorinfo = false
                    return true
                }
            }
        }
      }
</script>