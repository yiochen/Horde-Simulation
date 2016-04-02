
var Horde=function(){
    var Horde=function(){
        this.name="horde";
        this.members=[];
        this.r=100;
        this.pos=createVector(0,0);
        this.v=createVector(0,0);
        this.centerR=20;
        this.moving=false;
    };
    Horde.prototype.draw=function(){
        //draw the center;
        fill(0);
        ellipse(this.pos.x, this.pos.y, this.centerR*2, this.centerR*2);
        noFill();
        stroke(100);
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
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
        this.pos.add(this.v);
        wrap(this);
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
        this.pos=createVector(0,0);
        this.maxV=2;
        this.v=createVector(2,0);
        this.state=1;
        this.timer=null;
        this.horde=null;
        this.waiting=true;
        this.target=null;//the position that the zombie is moving toward, relative to the center of the horde.
    };

    Zombie.prototype.draw=function(){
        fill('rgba(0,255,0,0.25)');
        noStroke();
        rect(this.pos.x-this.r, this.pos.y-this.r*2, this.r*2, this.r*3);
    };

    Zombie.prototype.update=function(){
        this.v.set(0,0);
        this.cohesion();
        this.seperate();
        this.follow();
        this.pos.add(this.v);
        wrap(this);
    };
    Zombie.prototype.calTarget=function(){
        //get a random vector within the radius.
        var normal=createVector(1,0);
        var horde=this.horde;
        this.target=normal.rotate(Math.random()*Math.PI*2).mult((0.5-Math.pow(Math.random(),2)+0.5)*(horde.r-horde.centerR)+horde.centerR);
    };
    //behaviors
    //If outside of the circle, move toward the circle
    Zombie.prototype.cohesion=function(){
        var horde=this.horde;
        if (getDist(this, horde)>horde.r){//if outside of the circle
            //move toward horde
            if (this.target===null){
                this.calTarget();
            }

            this.v=horde.pos.copy().add(this.target).sub(this.pos).normalize().mult(this.maxV);
        }
    };
    //If too clowded within a circle, move to another place
    Zombie.prototype.seperate=function(){

        var horde=this.horde;
        var zom=this;
        if (zom.timer!==null && zom.waiting ){
            //just wait

        }else if (zom.timer===null && zom.waiting){
            zom.waiting=false;
            zom.calTarget();//start moving
        }else if (zom.timer===null && zom.pos.copy().sub(horde.pos.copy().add(zom.target)).mag()<=EPSILON){
            //got to target  start timer and wait
            zom.waiting=true;
            zom.timer=setInterval(function(){
                clearInterval(zom.timer);
                zom.timer=null;
            },1000+Math.random()*500);
        }else if (zom.timer===null){
            this.v=horde.pos.copy().add(this.target).sub(this.pos).normalize().mult(this.maxV);
        }
        // if (horde.moving===false && zom.target !==null){
        //     if (zom.pos.copy().sub(horde.pos.copy().add(zom.target)).mag()<=EPSILON){
        //
        //
        //         zom.timer=setInterval(function(){
        //
        //             clearInterval(zom.timer);
        //             zom.timer=null;
        //         },1000+Math.random()*500);
        //     }else {//if the center is not moving,and is still far away from the target, keep moving to the target
        //
        //
        //     }
        // }

    };
    //If the center start moving, move as well
    Zombie.prototype.follow=function(){
        var horde=this.horde;
        //if inside the circle, follow the center
        if (getDist(this, horde)<=horde.r && horde.moving){
            this.v=horde.v.copy().normalize().mult(this.maxV);
        }
        if (horde.v.mag()<=EPSILON){//center is not moving

        }
    };
    return Zombie;
}();

Zombie.create=function(x,y){
    var zom=new Zombie();
    zom.pos.set(x,y);
    return zom;
};
