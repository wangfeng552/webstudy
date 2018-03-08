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
                    <span class="itemsLeft2">单行文本</span>
                    <label class="am-checkbox am-secondary">
                      <input type="checkbox" v-model="check" @click="addGuize">必填
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
                    <span class="itemsLeft">文字验证：</span>
                    <div style="display: inline-block;">
                        <label class="am-radio am-secondary">
                          <input type="radio" value="不限" data-am-ucheck v-model="messages.checkList">不限
                        </label>
                        <label class="am-radio am-secondary">
                          <input type="radio"  value="电话号码" data-am-ucheck v-model="messages.checkList">电话号码
                        </label>
                        <label class="am-radio am-secondary">
                          <input type="radio"  value="数字" data-am-ucheck v-model="messages.checkList">数字
                        </label>
                        <label class="am-radio am-secondary">
                          <input type="radio" value="身份证" data-am-ucheck v-model="messages.checkList">身份证
                        </label>
                        <label class="am-radio am-secondary">
                          <input type="radio" value="手机号" data-am-ucheck v-model="messages.checkList">手机号
                        </label>
                    </div>
                </div>
                <div>{{checkShow}}</div>
            </div>
		</div>
	</div>
</template> 
<script>
    import {mapGetters} from 'vuex'
    export default{
        name:'chartinput',
        data(){
            return {
                check:false,
                errorinfo:false,
                checked:true,
                option:{
                   value:'' 
                },
                checkList: '',
                inputValue:'',
                messages:{checkList:'不限'}
            }
        },
        props:['message', 'parent', 'index'],
        computed:{
            checkShow(){
                this.message.rules.forEach((v)=>{
                    if (v == 'required') {
                        this.check = true
                    }else{
                        this.check = false
                    }            
                })
            }
        },
        methods:{
            // 删除当前项
        	delLastOne(){
        		this.parent.splice(this.index, 1)
        		window.localStorage.setItem('items', JSON.stringify(this.parent))
        	},
            // 必填往items里增加required
            addGuize(){
                if (this.check == true) {
                    this.message.rules.push('required')
                }else{
                    this.message.rules.splice('required')
                }
                window.localStorage.setItem('check', JSON.stringify(this.check))
            },
            // 失去焦点时判断用户是否填写标题，并把状态存到vuex里
            inputBlur(){
                if (this.message.title == '') {
                    this.errorinfo = true
                    return false
                }else{
                    this.errorinfo = false
                    return true
                }
            },
            inputBlur2(){
                if (this.message.value[0] == '') {
                    this.errorinfo2 = true
                    return false
                }else{
                    this.errorinfo2 = false
                    return true
                }
            }
        }
      }
</script>
<style lang="scss" scoped>

</style>