/**
 * Created by Administrator on 2016/12/23.
 */
document.body.onload=game;  // game:game函数作为主入口被执行
var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;  //帧与帧之间的时间间隔

var bgPic=new Image();   //创建背景图片
var mom;
var ane;   //设置全部变量
var fruit;
var baby;

var mx;
var my;

var babyTail=[];    //定义小鱼的尾巴
var babyEye=[];
var babyBody=[];

//大鱼
var momTail=[];
var momEye=[];
var momBodyOrange=[];
var momBodyBlue=[];

var data;
var wave;

function game(){
    //游戏初始化
    init();
    lastTime=Date.now();    //获取当前的时间（上一帧完成的时间）
    gameLoop();       //做这个有里面的所有动画
}
function init(){
    // 获得画布，再获得画笔，画笔是canvas的api获得的
    can1=document.getElementById("canvas1");
    ctx1=can1.getContext("2d");    //绘制鱼，果实

    can1.addEventListener("mousemove",onMouseMove,false);

    can2=document.getElementById("canvas2");
    ctx2=can2.getContext("2d");    //绘制背景,草

    data=new dataObj();

    //在canvas里绘制图片
    canWidth=can1.width;
   canHeight=can1.height;

    //定义好这个图片的路径
    bgPic.src="./images/background.jpg";
    ctx2.drawImage(bgPic,0,0,canWidth,canHeight);

    ane=new aneObj();    //绘制海葵  （高内聚低耦合）
    ane.init();


    fruit=new fruitObj();
    fruit.init();

    mom=new momObj();
    mom.init();

    baby=new babyObj();
    baby.init();


    //游戏数据



    wave=new waveObj();
    wave.init();


    mx=canWidth*0.5;
    my=canHeight*0.5;



    for(var i=0;i<8;i++){
        babyTail[i]=new Image();
        babyTail[i].src="./images/babyTail"+i+".png";
    }
    for(var i=0;i<2;i++){
        babyEye[i]=new Image();
        babyEye[i].src="./images/babyEye"+i+".png";
    }
    for(var i=0;i<20;i++){
        babyBody[i]=new Image();
        babyBody[i].src="./images/babyFade"+i+".png";
    }


    //大鱼
    for(var i=0;i<8;i++){
        momTail[i]=new Image();
        momTail[i].src="./images/bigTail"+i+".png";
    }
    for(var i=0;i<2;i++){
        momEye[i]=new Image();
        momEye[i].src="./images/bigEye"+i+".png";
    }
    for(var i=0;i<8;i++){
        momBodyOrange[i]=new Image();
        momBodyBlue[i]=new Image();
        momBodyOrange[i].src="./images/bigSwim"+i+".png";
        momBodyBlue[i].src="./images/bigSwimBlue"+i+".png";
    }

}
function gameLoop(){
    //为了防止有些帧过大不能再规定的时间间隔完成，所以采用这个客村的api，
    // 但是这个api没一帧的时间间隔不稳定
    requestAnimFrame(gameLoop);   //javascript的一个api,相对于setInterval,setTimeOut来说更科学

    var now=Date.now();

    //时间差就是定时器时间
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>40){
        deltaTime=40;
    }

    ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
    ane.draw();    //开始规制
    fruitCount();
    fruit.draw();

    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    momFruitCollision();
    momBabyCollision();

    baby.draw();
    data.draw();
    wave.draw();
}
function onMouseMove(e){
    //获取鼠标的位置
    if(!data.gameOver){
        if(e.offsetX||e.layerX){
            mx=e.offsetX==undefined? e.layerX:e.offsetX;
            my=e.offsetY==undefined? e.layerY:e.offsetY;
        }
    }
}
fruitObj.prototype.dead=function(i){
    if(fruit.alive[i]){
        fruit.alive[i]=false;
    }
}