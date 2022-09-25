cc.Class({
    extends: cc.Component,

    properties: {
        head: {
            default: null,
            type: cc.Node
        },
        gameOverNode: {
			default: null,
			type: cc.Node
		},
        btnNode: {
			default: null,
			type: cc.Node
		},
        BtnRestartNode: {
			default: null,
			type: cc.Node
		},
    },

    

    onLoad () {
        cc.debug.setDisplayStats(false);
        this.joyStickBtn = this.node.children[0]; 
		this.gameOverNode.active = false;
        //this.enabled = false;
 
    this.node.on('touchstart', this.onTouchStart, this);
    this.node.on('touchmove', this.onTouchMove, this);
    this.node.on('touchend', this.onTouchEnd, this);
    this.node.on('touchcancel', this.onTouchCancel, this);

    },

    onDestroy() {
        this.node.off('touchstart', this.onTouchStart, this);
        this.node.off('touchmove', this.onTouchMove, this);
        this.node.off('touchend', this.onTouchEnd, this);
        this.node.off('touchcancel', this.onTouchCancel, this);
    },

    onTouchStart(event) { 
        this.btnNode.active = false;
        this.gameOverNode.active = false;
        this.enabled = false;
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.joyStickBtn.setPosition(pos);
        this.startMoveAt();
    },
    
    startMoveAt() {
		this.enabled = true;
	}, 
    stopMoveAt(){
        this.enabled = false;
    },
    onTouchMove(event) {
        //不断改变joyStickBtn的位置
        let posDelta = event.getDelta();
        this.joyStickBtn.setPosition(this.joyStickBtn.position.add(posDelta));
        
        // 得到方向
        let dir = this.joyStickBtn.position.normalize();
        this.head.getComponent('Head').dir = dir;
    },
     
    onTouchEnd(event) {
        this.joyStickBtn.setPosition(cc.v2(0, 0));
    },
     
    onTouchCancel(event) {
        this.joyStickBtn.setPosition(cc.v2(0, 0));
    },
    

    start () {

    },

    update (dt) {
        let len = this.joyStickBtn.position.mag();
    let maxLen = this.node.width / 2;
    let ratio = len / maxLen;
 
    if (ratio > 1) {
        this.joyStickBtn.setPosition(this.joyStickBtn.position.div(ratio));
    }
        
    if (this.head.x > this.head.parent.width / 2)
        {
				this.gameOverNode.active = true;
                this.stopMoveAt();
                this.BtnRestartNode.active = true;
                this.head.getComponent('Head').speed = 0 ;
        }
    else if (this.head.x < -this.head.parent.width / 2)
        {
            this.gameOverNode.active = true;
            this.stopMoveAt();
            this.BtnRestartNode.active = true;
            this.head.getComponent('Head').speed = 0 ;
        }
    if (this.head.y > this.head.parent.height / 2)
        {
            this.gameOverNode.active = true;
            this.stopMoveAt();
            this.BtnRestartNode.active = true;
            this.speed = 0;
            this.head.getComponent('Head').speed = 0 ;
        }
    else if (this.head.y < -this.head.parent.height / 2)
        {
            this.gameOverNode.active = true;
            this.stopMoveAt();
            this.BtnRestartNode.active = true;
            this.speed = 0;
            this.head.getComponent('Head').speed = 0 ;
        }
    },
    
});
