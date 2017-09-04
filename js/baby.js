/**
 * Created by Administrator on 2016/12/25.
 */
var babyObj=function(){
    this.x;
    this.y;
    this.angle;
    //this.babyEye=new Image();
   // this.babyBody=new Image();
   // this.babyTail=new Image();

    //鱼尾巴的定时器
    this.babyTailTimer=0;
    this.babyTailCount=0;    //用来计数

    //鱼眼睛
    this.babyEyeTimer=0;
    this.babyEyeCount=0;
    //鱼闭眼和眨眼之间的是时间
    this.babyEyeInterval=300;

    //小鱼身体
    this.babyBodyTimer=0;
    this.babyBodyCount=0;
}
babyObj.prototype.init=function(){
    this.x=canWidth*0.5-50;
    this.y=canHeight*0.5+50;
    this.angle=0;
    //this.babyEye.src="./images/babyEye0.png";
   // this.babyBody.src="./images/babyFade0.png";
    //this.babyTail.src="./images/babyTail0.png";
}

babyObj.prototype.draw=function () {
    this.x=lerpDistance(mom.x,this.x,0.95);
    this.y=lerpDistance(mom.y,this.y,0.95);

    //开始计算旋转的角度
    var deltaX=mom.x-this.x;
    var deltaY=mom.y-this.y;
    var rotate=Math.atan2(deltaY,deltaX)+Math.PI;
    this.angle=lerpAngle(rotate,this.angle,0.6);

    //动态地改变鱼尾巴
    this.babyTailTimer+=deltaTime;
    if(this.babyTailTimer>50){      //鱼尾巴改变的时间
        //改变
        this.babyTailCount=(this.babyTailCount+1)%8;    //[0-7]的范围
        //时间也要重新计算
        this.babyTailTimer%=50;
    }
    var babyTailCount=this.babyTailCount;

    //动态地改变鱼的眼睛
    this.babyEyeTimer+=deltaTime;
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount=(this.babyEyeCount+1)%2;
        this.babyEyeTimer%=this.babyEyeInterval;

        //要知道鱼这一秒是眨眼还是闭眼
        if(this.babyEyeCount==0){   //闭眼要挣开
            this.babyEyeInterval=Math.random()*1500+1500;    //1.5s-3s
        }else{
            this.babyEyeInterval=300;
        }
    }
    var babyEyeCount=this.babyEyeCount;

    //动态的改变小鱼的身体
    this.babyBodyTimer+=deltaTime;
    if(this.babyBodyTimer>300){   //小鱼改变身体的时间
        //改变
        this.babyBodyCount=this.babyBodyCount+1;
        //时间也要重新计算
        this.babyBodyTimer%=300;
        //一旦鱼的身体这个i变成了19，就游戏结束
        if(this.babyBodyCount>19){
            this.babyBodyCount=19;
            //游戏结束
            //console.log("游戏结束");
            data.gameOver=true;
        }
    }
    var babyBodyCount=this.babyBodyCount;

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+25,-babyTail[babyTailCount].height*0.5);
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
    ctx1.restore();
}
