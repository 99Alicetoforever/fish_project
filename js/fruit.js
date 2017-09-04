/**
 * Created by Administrator on 2016/12/24.
 */
var fruitObj=function () {
    this.alive=[];
    this.x=[];
    this.y=[];           //果实生成的位置
    this.l=[];    //控制果实的生成
    this.speed=[];         //果实生长和离开的速度
    this.fruitType=[];      //果实的类型
    this.orange=new Image();
    this.blue=new Image();
};
fruitObj.prototype.num=30;   //果实的数量
fruitObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i]=true;
        this.x[i]=0;
        this.y[i]=0;
        this.l[i]=0;
        this.fruitType[i]="";
        this.speed[i]=Math.random()*0.02+0.003;
        this.born(i);   //生成果实
        //console.log(this.fruitType[i]);
    }
    this.orange.src="./images/fruit.png";
    this.blue.src="./images/blue.png";
};

fruitObj.prototype.draw=function(){

    for(var i=0;i<this.num;i++) {         //黄色果实的数量不太懂
        if(this.alive[i]){
            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }else{
                var pic=this.orange;
            }
           // console.log(this.fruitType[i]);
        //判断大小
        if (this.l[i] <= 15) {
            //说明果实没有成熟
            this.l[i] += this.speed[i]*deltaTime;
        } else {
            //已成熟
            this.y[i] -= this.speed[i]*deltaTime*7;
        }
        // ctx1.clearRect(0,0,canWidth,canHeight);
        ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
        if (this.y[i] < 10) {
            //超出屏幕，死亡
            this.alive[i] = false;
        }
      }
    }
 };


fruitObj.prototype.born=function(i){
    //得先找到海葵
    var aneId=Math.floor(Math.random()*ane.num);   //0~49
    this.x[i]=ane.x[aneId];
    this.y[i]=canHeight-ane.len[aneId];
    this.l[i]=0;    //重新定义大小
    this.alive[i]=true;

    //控制蓝色果实的生长几率
    var ran=Math.random();

    //console.log(ran);
    if(ran<0.15){
        //蓝色
        this.fruitType[i]="blue";
    }else{
        this.fruitType[i]="orange";
    }
   //console.log(this.fruitType[i]);
};
function fruitCount(){
    //监听在网页里面果实的数量
    var num=0;       //屏幕最多生成果实的数量
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]){
            num++;
        }
    }
    if(num<15){
        sendFruit();
        return;
    }
}


function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}
fruitObj.prototype.dead=function (i) {
    this.alive[i]=false;
}
