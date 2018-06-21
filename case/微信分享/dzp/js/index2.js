(function () {
    var imgQb = new Image();
    imgQb.src = "~/../images/qb.png";
    var imgSorry = new Image();
    imgSorry.src = "~/../images/2.png";
    var imglogo = new Image();
    var activity={
        turnWheel:{
            rewardNames:["50M流量包","10Q币", "谢谢参与","5Q币","50M流量包", "20Q币 ","30M流量包","摩拜单车5原卷新"],				//转盘奖品名称数组
            colors:["#FFF4D7","#FFFFFF", "#F0F4D8","#FFFFFF", "#FFF4D0","#FFFFFF", "#FFF4D0","#FFFFFF"],					//转盘奖品区块对应背景颜色
            outsideRadius:192,			//转盘外圆的半径
            textRadius:155,				//转盘奖品位置距离圆心的距离
            insideRadius:68,			//转盘内圆的半径
            startAngle:0,				//开始角度
            bRotate:false				//false:停止;ture:旋转
        },
        init: function () {
            var self = this;
            self.getTurntableMessage();
            self.clickLottery()
        },
        getTurntableMessage:function () {
            // 获取大转盘信息
            var self = this;
            ajaxUtil.loadData({
                url: '/pointgate/activity-web/queryActivityPageByCode',
                type: 'get',
                params: {activityCode: '02003159'},
                onSuccess: function (data) {
                    imglogo.src = "/"+data.shareImg;
                    self.turnWheel.rewardNames = ["10M流量包","123234", "谢谢参与","5Q币","10M流量包", "DFG ","30M流量包","摩拜单车5原卷新"];
                    setTimeout(function () {
                        self.drawWheelCanvas();
                    },1000)
                    // turnWheel.rewardNames = data["rewardNames"];
                    // turnWheel.colors = data["colors"];

                },
                onError: function(opt) {
                    spm.push(['_trackEvent', '/poi', 'click', opt.code || opt.msg]);
                    mui.toast(opt.msg, { duration: '1000', type: 'div' });
                }
            })
        },
        clickLottery:function () {
            // 点击抽奖
            var self =this;
            $('.pointer').click(function (){
                if(self.turnWheel.bRotate) return;
                self.turnWheel.bRotate = !self.turnWheel.bRotate;
                var count = self.turnWheel.rewardNames.length;

                // 这里应该是从服务器获取用户真实的获奖信息（对应的获奖序号）
                // 简单模拟随机获取奖品的序号(奖品个数范围内)
                var item = 0;
                // 开始抽奖
                self.rotateFunc(item, self.turnWheel.rewardNames[item],count);
            });
        },
        rotateFunc:function (item, tip,count) {
            //旋转转盘 item:奖品序号，从0开始的; txt：提示语 ,count 奖品的总数量;
            var self =this;
            var baseAngle = 360 / count;
            var angles = 360 * 3 / 4 - ( item * baseAngle) - baseAngle / 2;
            $('#wheelCanvas').stopRotate();
            $('#wheelCanvas').rotate({
                angle:0,
                animateTo:angles + 360 * 5,
                duration:8000,
                callback:function (){
                    $("#tip").text(tip);
                    alert(tip)
                    self.turnWheel.bRotate = !self.turnWheel.bRotate;
                }
            });
        },
        drawWheelCanvas:function () {
            var self = this;
            var canvas = document.getElementById("wheelCanvas");
            var baseAngle = Math.PI * 2 / (self.turnWheel.rewardNames.length);
            var ctx=canvas.getContext("2d");
            var canvasW = canvas.width;
            var canvasH = canvas.height;
            ctx.clearRect(0,0,canvasW,canvasH);
            ctx.strokeStyle = "#FFBE04"; // 红色
            ctx.font = '16px Microsoft YaHei';

            // 注意，开始画的位置是从0°角的位置开始画的。也就是水平向右的方向。
            for(var index = 0 ; index < self.turnWheel.rewardNames.length ; index++)
            {
                // 当前的角度
                var angle = self.turnWheel.startAngle + index * baseAngle;
                // 填充颜色
                ctx.fillStyle = self.turnWheel.colors[index];

                // 开始画内容
                // ---------基本的背景颜色----------
                ctx.beginPath();
                /*
                 * 画圆弧，和IOS的Quartz2D类似
                 * context.arc(x,y,r,sAngle,eAngle,counterclockwise);
                 * x :圆的中心点x
                 * y :圆的中心点x
                 * sAngle,eAngle :起始角度、结束角度
                 * counterclockwise : 绘制方向,可选，False = 顺时针，true = 逆时针
                 * */
                ctx.arc(canvasW * 0.5, canvasH * 0.5, self.turnWheel.outsideRadius, angle, angle + baseAngle, false);
                ctx.arc(canvasW * 0.5, canvasH * 0.5, self.turnWheel.insideRadius, angle + baseAngle, angle, true);
                ctx.stroke();
                ctx.fill();
                //保存画布的状态，和图形上下文栈类似，后面可以Restore还原状态（坐标还原为当前的0，0），
                ctx.save();

                /*----绘制奖品内容----重点----*/
                // 红色字体
                ctx.fillStyle = "#E5302F";
                var rewardName = self.turnWheel.rewardNames[index];
                var line_height = 17;
                // translate方法重新映射画布上的 (0,0) 位置
                // context.translate(x,y);
                // 见PPT图片，
                var translateX =  canvasW * 0.5 + Math.cos(angle + baseAngle / 2) * self.turnWheel.textRadius;
                var translateY =  canvasH * 0.5 + Math.sin(angle + baseAngle / 2) * self.turnWheel.textRadius;
                ctx.translate(translateX,translateY);

                // rotate方法旋转当前的绘图，因为文字适合当前扇形中心线垂直的！
                // angle，当前扇形自身旋转的角度 +  baseAngle / 2 中心线多旋转的角度  + 垂直的角度90°
                ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);

                /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                // canvas 的 measureText() 方法返回包含一个对象，该对象包含以像素计的指定字体宽度。
                // fillText() 方法在画布上绘制填色的文本。文本的默认颜色是黑色. fillStyle 属性以另一种颜色/渐变来渲染文本
                /*
                 * context.fillText(text,x,y,maxWidth);
                 * 注意！！！y是文字的最底部的值，并不是top的值！！！
                 * */
                if(rewardName.indexOf("M")>0){//查询是否包含字段 流量包
                    var rewardNames = rewardName.split("M");
                    for(var j = 0; j<rewardNames.length; j++){
                        ctx.font = (j == 0)?'bold 20px Microsoft YaHei':'16px Microsoft YaHei';
                        if(j == 0){
                            ctx.fillText(rewardNames[j]+"M", -ctx.measureText(rewardNames[j]+"M").width / 2, j * line_height);
                        }else{
                            ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
                        }
                    }
                }else if(rewardName.indexOf("M") == -1 && rewardName.length>6){//奖品名称长度超过一定范围
                    rewardName = rewardName.substring(0,6)+"||"+rewardName.substring(6);
                    var rewardNames = rewardName.split("||");
                    for(var j = 0; j<rewardNames.length; j++){
                        ctx.fillText(rewardNames[j], -ctx.measureText(rewardNames[j]).width / 2, j * line_height);
                    }
                }else{
                    //在画布上绘制填色的文本。文本的默认颜色是黑色
                    ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0);
                }

                //添加对应图标
                if(rewardName.indexOf("Q币")>0){
                    // 注意，这里要等到img加载完成才能绘制
                    imgQb.onload=function(){
                        ctx.drawImage(imgQb,-15,10);
                    };
                    ctx.drawImage(imgQb,-15,10);

                }else if(rewardName.indexOf("谢谢参与")>=0){
                    imgSorry.onload=function(){
                        ctx.drawImage(imgSorry,-15,10);
                    };
                    ctx.drawImage(imgSorry,-15,10);
                } else if(rewardName.indexOf(self.turnWheel.rewardNames[7].slice(0,3))>=0){
                    imglogo.onload=function(){
                        ctx.drawImage(imglogo,-15,10);
                    };
                    ctx.drawImage(imglogo,-15,10);
                }
                //还原画板的状态到上一个save()状态之前
                ctx.restore();
            }
        }
    };
    activity.init();
})()
