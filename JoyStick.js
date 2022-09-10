cc.Class({
    extends: cc.Component,

    properties: {
        head: {
            default: null,
            type: cc.Node
        },
        
        
    },

    

    onLoad () {
        cc.debug.setDisplayStats(false);
        this.joyStickBtn = this.node.children[0]; 
        
 
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
        let pos = this.node.convertToNodeSpaceAR(event.getLocation());
        this.joyStickBtn.setPosition(pos);
    },
     
    onTouchMove(event) {
        let posDelta = event.getDelta();
        this.joyStickBtn.setPosition(this.joyStickBtn.position.add(posDelta));
                
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
        this.head.x = this.head.parent.width / 2;
    else if (this.head.x < -this.head.parent.width / 2)
        this.head.x = -this.head.parent.width /2;
 
    if (this.head.y > this.head.parent.height / 2)
        this.head.y = this.head.parent.height / 2;
    else if (this.head.y < -this.head.parent.height / 2)
        this.head.y = -this.head.parent.height / 2;

    },
    
});
