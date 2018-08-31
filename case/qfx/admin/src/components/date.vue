<template>
	<div class="typeline">
	    <span class="yuandian" style="color: red;" v-show="yuandian">*</span>
		<div class="leftshouru" style="display: inline-block;">
            <span class="serialNumber">({{index+1}})</span>
            <span class="fromtitle">{{message.title}}</span>
        </div>
		<p class="beizhu" v-html="message.describe"></p>
		<div class="block" style="display:inline-block;">
		    <el-date-picker
		      v-model="value1"
		      type="date"
		      placeholder="选择日期"
		      :picker-options="pickerOptions0">
		    </el-date-picker>
		</div>
		<div class="block" style="display:inline-block;margin-left: 20px;">
		    <el-date-picker
		      v-model="value2"
		      type="date"
		      placeholder="选择日期"
		      :picker-options="pickerOptions0">
		    </el-date-picker>
		</div>
		  <div>{{requiredShow}}</div>
	</div>
</template>
<script>
    import amaze from '../assets/js/amazeui.min.js'
    export default{
        props: ['message','index'],
        data() {
        	return {
        		yuandian:false,
        		check:'',
        		pickerOptions0: {
		          disabledDate(time) {
		            return time.getTime() < Date.now() - 8.64e7;
		          }
		        },
		        pickerOptions1: {
		          shortcuts: [{
		            text: '今天',
		            onClick(picker) {
		              picker.$emit('pick', new Date());
		            }
		          }, {
		            text: '昨天',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24);
		              picker.$emit('pick', date);
		            }
		          }, {
		            text: '一周前',
		            onClick(picker) {
		              const date = new Date();
		              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', date);
		            }
		          }]
		        },
		        value1: '',
		        value2: '',
        	}
        },
        computed:{
            requiredShow(){
            	this.message.rules.forEach((v)=>{
                    if (v == 'required') {
                        this.yuandian = true
                    }else{
                    	this.yuandian = false
                    }           
                })
                this.message.describe = this.message.describe.replace(/(?:\r\n|\r|\n)/g, '<br />'); 
            }
        },
        methods:{
        	
        }
    }
</script>