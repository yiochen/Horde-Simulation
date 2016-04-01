var horde;
var worldW=640, worldH=480;
var hordeSpeed=2;
function setup(){
  createCanvas(worldW,worldH);
  //create a horde;
  horde=new Horde();
  horde.x=200;
  horde.y=200;
  //add some zombies
  horde.add(Zombie.create(50,100))
  .add(Zombie.create(100,250))
  .add(Zombie.create(150,200));


}

function draw(){
    clear();
    horde.update();
    horde.draw();
}

function keyPressed(){
    if (keyCode==LEFT_ARROW){
        horde.vx=-hordeSpeed;
    }
    if (keyCode==RIGHT_ARROW){
        horde.vx=hordeSpeed;
    }
    if (keyCode==UP_ARROW){
        horde.vy=-hordeSpeed;
    }
    if (keyCode==DOWN_ARROW){
        horde.vy=hordeSpeed;
    }
}
function keyReleased(){
    if (!keyIsDown(LEFT_ARROW) &&
        !keyIsDown(RIGHT_ARROW)
         ){
            horde.vx=0;
        }
    if (!keyIsDown(UP_ARROW) &&
    !keyIsDown(DOWN_ARROW)
         ){
            horde.vy=0;
        }

}
