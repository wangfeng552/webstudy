<template>
	<div class="typeline">
		<span class="leftshouru">({{index+1}})&nbsp;{{message.title}}</span>
		<p class="beizhu">{{message.describe}}</p>
		<div class="block">
		    <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围">
		    </el-date-picker>
		</div>
	</div>
</template>
<script>
    export default{
        props: ['message','index'],
        data() {
        	return {
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
        methods:{
        	
        },
        mounted(){
      		
      	}
    }
</script>