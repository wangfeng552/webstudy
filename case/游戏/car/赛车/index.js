//获取所有用到的标签
var wrap = document.querySelector(".wrap");
var car = document.querySelector(".car");
var gamestart = document.querySelector(".gameStart")
var gameOver = document.querySelector(".gameOver")
var startbtn = document.querySelector(".stratbtn")
var overbtn = document.querySelector(".overbtn")
var sc = document.querySelector(".sc")
var his = document.querySelector(".his")
var fs = document.querySelector(".fs")
    //赛车用表格画
car.innerHTML = "<table> <tr><td></td><td class='tdd'></td><td></td></tr> <tr><td class='tdd'></td><td></td><td class='tdd'></td></tr> <tr><td></td><td class='tdd'></td><td></td></tr> <tr><td class='tdd'></td><td></td><td class='tdd'></td></tr></table>"
    //赛车出现的位置
var saicheArr = ['0px',
    '150px',
    '300px'
];
var speedTemp = 1; /*赛车移动的距离*/
var score = 0; /*分数*/
var timeraaaa = 2300; /*赛车创建的时间*/
var Timer1 = null; /*赛车移动的计时器*/
var flag = true; /*键盘按下的开关*/

//随机函数取赛车的位置
function rand() {
    return Math.floor(Math.random() * 3);
}

//      随机创建赛车
function createCar() {
    //  console.log(timer);
    var cars = document.createElement('div');
    cars.className = 'cars';
    cars.innerHTML = "<table> <tr><td></td><td class='tdds'></td><td></td></tr> <tr><td class='tdds'></td><td></td><td class='tdds'></td></tr> <tr><td></td><td class='tdds'></td><td></td></tr> <tr><td class='tdds'></td><td></td><td class='tdds'></td></tr></table>"

    cars.style.left = saicheArr[rand()];
    cars.style.top = '-200px';
    wrap.appendChild(cars);
    //赛车移动
    cars.speed = -200;
    cars.Timer = setInterval(function() {
        cars.speed += speedTemp;
        cars.style.top = cars.speed + 'px';
        if(cars.offsetTop > 800) {
            clearInterval(cars.Timer);
            wrap.removeChild(cars);
            score += 1;
            fs.innerHTML = score;
        }

        //判断游戏结束的情况
        if(car.offsetTop <= (cars.offsetTop + 200) && car.offsetLeft == cars.offsetLeft) {
            console.log('撞上了')
            gameover();
        }
    }, 5)

}
//游戏开始
startbtn.onclick = function() {
        createCar();
        Timer1 = setInterval("createCar()", timeraaaa);
        gamestart.style.display = 'none';
    }
    //重新开始
overbtn.onclick = function() {
        history.go('0');
    }
    //键盘事件
document.onkeydown = function() {
        var event = event || window.event;
        var left = car.offsetLeft
        switch(event.keyCode) {
            case 37:
                if(left == 0) {
                    car.style.left = '0px';
                } else {

                    car.style.left = left - 150 + 'px';
                }
                break;
            case 39:
                if(left == 300) {
                    car.style.left = '300px';
                } else {
                    car.style.left = left + 150 + 'px';
                }
                break;
            case 38:
                speedTemp = 3;
                if(flag) {
                    clearInterval(Timer1);
                    timeraaaa = 850;
                    Timer1 = setInterval("createCar()", timeraaaa);
                    flag = false;
                }
                console.log(timeraaaa);

                break;
        }
    }
    //松开键盘的事件
document.onkeyup = function() {
        var ev = event || window.event;
        if(ev.keyCode == 38) {
            speedTemp = 1;
            clearInterval(Timer1);
            timeraaaa = 2300;
            Timer1 = setInterval("createCar()", timeraaaa);
            flag = true;
        }
    }
    //游戏结束
function gameover() {
    sc.innerHTML += score;
    gameOver.style.display = 'block';
    clearTimer();
    //历史积分
    var historyScore = localStorage.getItem('his');
    if(historyScore == null || historyScore < score) {
        localStorage.setItem('his', score);
        historyScore = score;
    }
    his.innerHTML = historyScore;
}
//清除所有计时器
function clearTimer() {
    var timer = setInterval(function() {}, 30);
    for(var i = 0; i < timer; i++) {
        clearInterval(i);
    }
}