<template>
	<div>
		<div class="chartinputCont chartdateCont">
			<div class="chartTop">
                <span class="topIndex">问题{{index+1}}</span>
                <span class="cha" @click="delLastOne">
                    <img src="../../assets/images/create/cha.png" height="12" width="12">
                </span>
            </div>
			<div class="bigBox">
				<div class="itemsP">
	    			<span class="itemsLeft">问题类型：</span>
					<span class="itemsLeft2">日期</span>
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
	    		<div>{{checkboxShow}}</div>
			</div>
		</div>
	</div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default{
        name:'chartdate',
        props:['message', 'parent', 'index'],
        data() {
        	return {
        		checked:false,
        		errorinfo:false,
        		pickerOptions2: {
		          shortcuts: [{
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		              picker.$emit('pick', [start, end]);
		            }
		          }]
		        },
		        value6: '',
		        value7:''
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
        methods:{
        	// 删除当前项
        	delLastOne(e){
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
                window.localStorage.setItem('check7', JSON.stringify(this.checked))
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
            }
        }
      }
</script>