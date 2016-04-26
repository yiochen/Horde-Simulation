var horde;

var hordeSpeed=2;
function setup(){
  createCanvas(worldW,worldH);
  //create a horde;
  horde=new Horde();
  horde.pos.set(200,200);
  //add some zombies
  for (var i=0;i<20;i++){
      horde.add(Zombie.create(200,200));
  }


}

function draw(){
    clear();
    horde.update();
    horde.draw();
}

function keyPressed(){
    horde.moving=true;
    if (keyCode==LEFT_ARROW){
        horde.v.setX(-hordeSpeed);
    }
    if (keyCode==RIGHT_ARROW){
        horde.v.setX(hordeSpeed);
    }
    if (keyCode==UP_ARROW){
        horde.v.setY(-hordeSpeed);
    }
    if (keyCode==DOWN_ARROW){
        horde.v.setY(hordeSpeed);
    }
}
function keyReleased(){
    var stopX=false;
    if (!keyIsDown(LEFT_ARROW) &&
        !keyIsDown(RIGHT_ARROW)
         ){
            horde.v.setX(0);
            stopX=true;
        }
    var stopY=false;
    if (!keyIsDown(UP_ARROW) &&
    !keyIsDown(DOWN_ARROW)
         ){
            horde.v.setY(0);
            stopY=true;
        }
    if (stopX && stopY){
        horde.moving=false;
    }

}
