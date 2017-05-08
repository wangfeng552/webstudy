<template>
	<div class="ball-container">
		<div transition="drop" class="ball" v-for="ball in balls" v-show="ball.show"></div >
		<div class="inner inner-book"></div>
	</div>

	<div v-ref="shopcart"></div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				balls:[
					{show:false},
					{show:false},
					{show:false},
					{show:false},
					{show:false},
				],
				//已经下落的小球
				dropBalls:[]
			}
		},
		created() {
			
		},
		methods:{
			this.$dispatch('cart.add',event.target);
			_drop(target){
				//体验优化，异步执行下落动画
				this.$nextTick(() =>{
					this.$refs.shopcart.drop(traget)
				})
			},

			drop(el) {
				console.log(el)
				for(let i=0;i<this.balls.length;i++){
					let ball = this.balls[i];
					if(!ball.show){
						ball.show=true;
						ball.el=el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},

			transition:{
				drop: {
					beforeEnter(el){
						let count = this.balls.length;
						while(count--){
							let ball = this.balls[count];
							if(ball.show){
								// getBoundingClientRect 获取元素位置 top,lef,right,bottom,width,height
								let rect=ball.el.getBoundingClientRect(); 
								let x = rect.left - 32;
								// window.innerHeight 获取视口的高度
								let y = -(window.innerHeight-rect.top-22)
								el.style.display = '';
								el.style.webkitTransform = `translate3d(0,${y}px,0)`;
								el.style.transform = `translate3d(0,${y}px,0)`;
								let inner = el.getElementByClassName('inner-book')[0]; // 获取所有指定类名的元素
								inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
								inner.style.transform = `translate3d(${x}px,0,0)`;
							}						}
					},
					enter(el){
						/* eslint-disable no-unused-vars */
						let rf = el.offsetHeight;	//取到div层的高度border+padding+content
						this.$nextTick(() => {
							el.style.webkitTransform = 'translate3d(0,0,0)';
							el.style.transform = 'translate3d(0,0,0)';
							let inner = el.getElementByClassName('inner-book')[0];
							inner.style.webkitTransform = 'translate3d(0,0,0)';
							inner.style.transform = 'translate3d(0,0,0)';
						})
					},
					afterEnter(el){
						let ball = this.dropBalls.shift();
						if(ball){
							ball.show=false;
							el.style.display="none"
						}
					}
				}
			}
		},
		events:{
			'cart.add'(target) {
				this._drop(trget){

				}
			}
		}
	}
</script>

<style>
	.ball-container{
		.ball{
			position: fixed;
			left: 32px;
			bottom: 22px;
			z-index: 200;
			&.drop-transition{
				transition: all .4s cubic-bezier(.49,-0.29,-0.75,0.41);
				.inner{
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: rgba(0,160,220);
					transition: all .4s linear
				}
			}
		}
	}
</style>
 <!-- 显示不同的ico -->