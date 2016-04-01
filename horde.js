var warp=function(item){
    if (item.x<0) item.x=worldW;
    else if (item.x>worldW) item.x=0;
    if (item.y<0) item.y=worldH;
    else if (item.y>worldH) item.y=0;
}

var Horde=function(){
    var Horde=function(){
        this.name="horde";
        this.members=[];
        this.r=100;
        this.x=0;
        this.y=0;
        this.vx=0;
        this.vy=0;
        this.centerR=20;
    };
    Horde.prototype.draw=function(){
        //draw the center;
        fill(0);
        ellipse(this.x, this.y, this.centerR*2, this.centerR*2);
        noFill();
        stroke(100);
        ellipse(this.x, this.y, this.r*2, this.r*2);
        this.members.forEach(function (item, index){
            item.draw();
        });
    };
    Horde.prototype.add=function(zombie){
        this.members.push(zombie);
        zombie.horde=this;
        return this;
    };
    Horde.prototype.update=function(){
        this.x+=this.vx;
        this.y+=this.vy;
        warp(this);
        this.members.forEach(function (item, index){
            item.update();
        });

    };

    return Horde;
}();

var STATES=['walking','idling','following'];

var Zombie=function(){
    var Zombie=function(){
        this.r=20;
        this.x=2;
        this.y=0;
        this.vx=2;
        this.vy=0;
        this.state=1;
        this.horde=NULL;
    };
    Zombie.prototype.draw=function(){
        fill(100);
        noStroke();
        ellipse(this.x, this.y, this.r*2, this.r*2);
    };

    Zombie.prototype.update=function(){
        this.x+=this.vx;
        this.y+=this.vy;
        warp(this);
    };

    //behaviors
    //If outside of the circle, move toward the circle
    Zombie.prototype.cohesion=function(){
        var horde=this.horde;

    };
    //If too clowded within a circle, move to another place
    Zombie.prototype.seperate=function(){
        var horde=this.horde;
    };
    //If the center start moving, move as well
    Zombie.prototype.follow=function(){
        var horde=this.horde;
    };
    return Zombie;
}();

Zombie.create=function(x,y){
    var zom=new Zombie();
    zom.x=x;
    zom.y=y;
    return zom;
};
