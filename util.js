var worldW=640, worldH=480;
var EPSILON=1;
function wrap(item){
    item.pos.wrapX(0, worldW);
    item.pos.wrapY(0, worldH);
}
function hypo(a, b){
    return Math.sqrt(a*a+b*b);
}

function getDist(item1, item2){
    return hypo(item1.pos.x-item2.pos.x, item1.pos.y-item2.pos.y);
}

p5.Vector.prototype.setX=function(x){
    this.set(x, this.y);
};
p5.Vector.prototype.setY=function(y){
    this.set(this.x, y);
};
p5.Vector.prototype.wrapX=function(min, max){
    if (this.x>max) this.setX(min);
    else if (this.x<min) this.setX(max);
};
p5.Vector.prototype.wrapY=function(min, max){
    if (this.y>max) this.setY(min);
    else if (this.y<min) this.setY(max);
};
