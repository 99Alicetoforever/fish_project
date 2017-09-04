/**
 * Created by Administrator on 2016/12/25.
 */
var momObj=function(){
    this.x;
    this.y;
    this.angle;


    //鱼尾巴的定时器
    this.momTailTimer=0;
    this.momTailCount=0;   //用来计数

    //鱼眼睛
    this.momEyeTimer=0;
    this.momEyeCount=0;
    //鱼闭眼，和睁眼之间的时间
    this.momEyeInterval=300;

    //鱼身体
    this.momBodyCount=0;
};
momObj.prototype.init=function(){
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=0;



}
momObj.prototype.draw=function () {
    this.x=lerpDistance(mx,this.x,0.95);
    this.y=lerpDistance(my,this.y,0.95);

    //开始计算旋转的角度
    var deltaX=mx-this.x;
    var deltaY=my-this.y;
    var rotate=Math.atan2(deltaY,deltaX)+Math.PI;
    this.angle=lerpAngle(rotate,this.angle,0.6);   //commonFunction里面的函数，用于求旋转的角度

    //动态地改变鱼尾巴
    this.momTailTimer+=deltaTime;
    if(this.momTailTimer>50){   //鱼尾巴改变的时间
        //改变
        this.momTailCount=(this.momTailCount+1)%8   //【0-7】的范围
        //时间也要重新计算
        this.momTailTimer%=50;
    }
    var momTailCount=this.momTailCount;
    //动态地改变鱼眼睛
    this.momEyeTimer+=deltaTime;
    if(this.momEyeTimer>this.momEyeInterval){   //鱼尾巴改变的时间
        //改变
        this.momEyeCount=(this.momEyeCount+1)%2   //【0-7】的范围
        this.momEyeTimer%=this.momEyeInterval;

        //要知道鱼这一秒到底是睁眼还是闭眼
        if(this.momEyeCount==0){  //闭眼
           this.momEyeInterval=Math.random()*1500+1500;
        }else{
            this.momEyeInterval=300;
        }
    }
    var momEyeCount=this.momEyeCount;

    var momBodyCount=this.momBodyCount;
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
    if(data.double==1){
        //绘制红色的
        ctx1.drawImage(momBodyOrange[momBodyCount],-momBodyOrange[momBodyCount].width*0.5,-momBodyOrange[momBodyCount].height*0.5)
    }else{
        //绘制蓝色的
        ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5)
    }
    //ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
    ctx1.restore();
}