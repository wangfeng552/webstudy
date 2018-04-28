<template>
	<div class="scenery-map main-content">
		<header-fix fixed :title="data.sceneryName"></header-fix>
		<div class="main">
			<div id="allmap"></div>
		</div>
	</div>
</template>
<script>
	import headerFix from "../../components/header";
	export default {
		data() {
			return {
				data:{
			     	longitude:'',//经度
					latitude:'',//纬度
					sceneryName: '', //景点名称
				}
			}
		},
		methods: {
		},
		created(){
			this.data = this.$route.query;
		},
		computed: {},
		components: {
			headerFix
		},
		mounted(){
			// 百度地图API功能
			let that = this;
			let  x = this.data.longitude;
            let  y = this.data.latitude;
            let point = new BMap.Point(x,y);
			let map = new BMap.Map("allmap");    // 创建Map实例
			let convertor = new BMap.Convertor();
			convertor.translate([point], 1, 5, function(data){
				if(data.status === 0) {
					let marker = new BMap.Marker(data.points[0]);
					map.addOverlay(marker);
					map.centerAndZoom(data.points[0], 15);
					let opts = {
						width : 0,     // 信息窗口宽度
						height: 0,     // 信息窗口高度
					}
					let infoWindow = new BMap.InfoWindow(that.data.sceneryName,opts);  // 创建信息窗口对象
					map.openInfoWindow(infoWindow,data.points[0]); //开启信息窗口
					marker.addEventListener("click", function(){          
						map.openInfoWindow(infoWindow,data.points[0]); //开启信息窗口
					});
				}
			})
		}
	}
</script>
<style lang="scss" scoped>
    $fontSize:.3rem;
	#allmap{
	   position: fixed !important;
	   top: 0;
	   bottom: 0;
	   width: 100%;
	   left: 0;
	   right: 0;
	   & /deep/ .BMap_bubble_content{
       		font-size:$fontSize;
	   }
	}
</style>