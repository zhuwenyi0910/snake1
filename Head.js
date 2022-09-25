cc.Class({
    extends: cc.Component,

    properties: {
        bodyPrefab: {
            default: null,
            type: cc.Prefab
        },

        foodPrefab: {
            default: null,
            type: cc.Prefab
        },
    
        speetNode: {
            default: null,
            type: cc.Node
        },
        BtnRestartNode: {
			default: null,
			type: cc.Node
		},
        gameOverNode: {
			default: null,
			type: cc.Node
		},

        bodyNum: 2,
     
        sectionLen: 25,

        time: 35
    
    },



    onLoad () {
        this.BtnRestartNode.active =false;

        this.snakeArray = [];
        this.snakeArray.push(this.node);
        

        this.node.color = this.randomColor();
        this.node.setPosition(this.randomPos());
        this.rotateHead(this.node.position);

        this.speed = this.sectionLen / this.time;
        this.pointsArray = [];

        // 初始化的身体
        for (let i=1; i<=this.bodyNum; i++)
        this.getNewBody();
        
        this.dir = null;

        this.headPointsNum = 0;

        let manager = cc.director.getCollisionManager();
    manager.enabled = true;
 
    let newFood = cc.instantiate(this.foodPrefab);
    this.node.parent.addChild(newFood);
    },

    Restart () {
        this.BtnRestartNode.active = false;
        this.gameOverNode.active = false;

        this.snakeArray = [];
        this.snakeArray.push(this.node);
        

        this.node.color = this.randomColor();
        this.node.setPosition(this.randomPos());
        this.rotateHead(this.node.position);

        this.speed = this.sectionLen / this.time;
        this.pointsArray = [];

        // 初始化的身体
        for (let i=1; i<=this.bodyNum; i++)
        this.getNewBody();
        
        this.dir = null;

        this.headPointsNum = 0;

        let manager = cc.director.getCollisionManager();
    manager.enabled = true;
 
    /*let newFood = cc.instantiate(this.foodPrefab);
    this.node.parent.addChild(newFood);*/
    },

    randomColor () {
        let red = Math.round(Math.random()*255);
        let green = Math.round(Math.random()*255);
        let blue = Math.round(Math.random()*255);
        return new cc.Color(red, green, blue);
    },

    randomPos () {
        let width = this.node.parent.width;
        let height = this.node.parent.height;
        let x = 0;
        let y = 0;
        return cc.v2(x, y);
    },


    getNewBody () {
        let newBody = cc.instantiate(this.bodyPrefab);
        if (this.snakeArray.length > this.bodyNum)
        newBody.curIndex = this.snakeArray[this.snakeArray.length-1].curIndex;
        else
        newBody.curIndex = 0;
     
        if(this.snakeArray.length == 1) {
            let dir = this.node.position.normalize();
            newBody.setPosition(this.node.position.sub(dir.mul(this.sectionLen)));
        }
        else {
            let lastBody = this.snakeArray[this.snakeArray.length-1];
            let lastBOBody = this.snakeArray[this.snakeArray.length-2];
            let dir = lastBOBody.position.sub(lastBody.position).normalize();
            newBody.setPosition(lastBody.position.sub(dir.mul(this.sectionLen)));
        }
     
        newBody.color = this.node.color;
     
        this.node.parent.addChild(newBody);
        this.snakeArray.push(newBody);
        this.recordPoints();
        this.changeZIndex();
    },

    rotateHead (headPos) {
        let angle = cc.v2(1, 0).signAngle(headPos) * 180/Math.PI;
        this.node.angle = angle-90;
    },
    
    recordPoints () {
        let len = 0;
        let index = 0;
     
        while(len < this.sectionLen) {
            len += this.speed;
     
            let lastBody = this.snakeArray[this.snakeArray.length-1];
            let lastBOBody = this.snakeArray[this.snakeArray.length-2];
            let dir = lastBOBody.position.sub(lastBody.position).normalize();
     
            let pos = lastBody.position.add(dir.mul(len));
            this.pointsArray.splice(index, 0, pos);
            index += 1;
        };
    },
    
    moveSnake() {
        // 蛇头移动
        let dis = this.dir.mul(this.speed);
        this.node.setPosition(this.node.position.add(dis));
        this.pointsArray.push(this.node.position);
        this.headPointsNum += 1;
 
        for(let i=1; i<this.snakeArray.length; i++) {
            let num = Math.floor((this.pointsArray.length-this.headPointsNum) / (this.snakeArray.length-1) * (this.snakeArray.length-1-i));
            this.snakeArray[i].setPosition(this.pointsArray[num+this.snakeArray[i].curIndex]);
            this.snakeArray[i].curIndex += 1;
        }
    
    },

    speetStartCallBack(){
        //if(speet)
            this.speed *= 2;
    },
    speetEndCallBack(){
        //if(speet)
            this.speed /= 2; 
    },


    changeZIndex(){
        for (let i=0; i<this.snakeArray.length; i++) {
            this.snakeArray[i].zIndex = cc.macro.MAX_ZINDEX - i;
        }
    },

    onCollisionEnter (other, self) {
        other.node.removeFromParent();
     
        let newFood = cc.instantiate(this.foodPrefab);
        this.node.parent.addChild(newFood);
     
        this.getNewBody();
    },

    start () {

    },

    update (dt) {
        if (this.dir) {
            // 改变蛇头的方向
            this.rotateHead(this.dir);
            this.moveSnake();
        }
            
    },
});
