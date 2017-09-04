/**
 * Created by Administrator on 2016/12/24.
 */
//定义一个海葵对象的类
var aneObj=function(){
    //海葵有很多属性定义为数组类型
    this.x=[];    //控制海葵的x轴位置
    this.len=[];     //控制海葵的高度
}
aneObj.prototype.num=50;     //海葵的数量

//海葵初始化，确定每一个海葵的位置
aneObj.prototype.init=function(){
    //数据赋值
    for(var i=0;i<this.num;i++){
        //每一条海葵的高度
        //随机数也可以由自己定义（16）
        //随机初始化一个位置
        this.x[i]=i*16+Math.random()*20;
        this.len[i]=200+Math.random()*50;
    }
};
//测试
aneObj.prototype.draw=function(){
    ctx2.save();
    ctx2.lineWidth=20;
    ctx2.lineCap="round";    //圆角
    ctx2.globalAlpha=0.6;    //透明度
    ctx2.strokeStyle="#3b154e";
    for(var i=0;i<this.num;i++){
        ctx2.beginPath();
        ctx2.moveTo(this.x[i],canHeight);
        ctx2.lineTo(this.x[i],canHeight-this.len[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};
