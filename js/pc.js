/**
 * Created by Administrator on 2016/12/25.
 */
function momFruitCollision() {
    if (!data.gameOver) {
        for (var i = 0; i < fruit.num; i++) {
            if (fruit.alive[i]) {
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if (l < 900) {
                    //果实被吃掉
                    fruit.dead(i);
                    //每吃掉一个，就要被记录一个
                    data.fruitNum++;
                    mom.momBodyCount++;     //大鱼身体变换
                    if (mom.momBodyCount > 7) {
                        mom.momBodyCount = 7;
                    }
                    //如果吃的是蓝色果实，那么分数翻倍
                    if (fruit.fruitType[i] == "blue") {
                        data.double = 2;
                    }
                   wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }
}

//大鱼喂小鱼
function momBabyCollision() {
    if (data.fruitNum > 0 && !data.gameOver) {
        var l = calLength2(mom.x, mom.y, baby.x, baby.y);
        if (l < 900) {
            //小鱼满血复活
            baby.babyBodyCount = 0;
            data.score+=data.fruitNum*100*data.double;    //分数的改变
            //大鱼吃的果实数据还原
            data.reset();
            mom.momBodyCount = 0;
        }
    }
}