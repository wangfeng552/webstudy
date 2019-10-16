<template>
  <div class="demo">
    <div class="can" ref="canvaslayout">
      <canvas width="200" height="200" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" ref="wfcanvas"></canvas>
    </div>
  </div>
</template>
<script>

export default {
  data(){
    return{
      canvasText:null,
      stage_info:[],
      startX:0,
      startY:0,
      moveX:0,
      moveY:0,
      points:[]
    }
  },
  mounted(){
    let canvas = this.$refs.wfcanvas;
    canvas.height = this.$refs.canvaslayout.offsetHeight - 60;
    canvas.width = this.$refs.canvaslayout.offsetWidth - 10;
    this.canvasText = canvas.getContext("2d");
    this.stage_info = canvas.getBoundingClientRect();
  },
  methods:{
     touchStart(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasText.beginPath();
        this.canvasText.moveTo(this.startX, this.startY);
        this.canvasText.lineTo(obj.x, obj.y);
        this.canvasText.stroke();
        this.canvasText.closePath();
        this.points.push(obj);
      }
    },
    
    touchMove(ev){
      ev= ev || event;
      ev.preventDefault();
      if(ev.touches.length == 1){
         let obj = {
           x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        }
         this.moveX = obj.x
        this.moveY = obj.y
        this.canvasText.beginPath();
        this.canvasText.moveTo(this.startX,this.startY);
        this.canvasText.lineTo(obj.x,obj.y);
        this.canvasText.stroke();
        this.canvasText.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj)
      }
    },
    touchEnd(ev){
        ev = ev || event;
      ev.preventDefault();
      console.log(ev);
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - this.stage_info.left,
          y: ev.targetTouches[0].clientY - this.stage_info.top
        };
        this.canvasText.beginPath();
        this.canvasText.moveTo(this.startX, this.startY);
        this.canvasText.lineTo(obj.x, obj.y);
        this.canvasText.stroke();
        this.canvasText.closePath();
        this.points.push(obj);
        this.points.push({
          x: -1,
          y: -1
        });
      }
    },
        overwrite() {
      this.canvasText.clearRect(
        0,
        0,
        this.$refs.wfcanvas.width,
        this.$refs.wfcanvas.height
      );
      this.points = [];
    },
    submit() {
      let imgBase64 = this.$refs.wfcanvas.toDataURL();
      console.log(imgBase64);
    }

  }
}
</script>
<style lang="less">
canvas {
  border: 1px solid #71b900;
}
</style>


