const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var  pig1,pig3;
var backgroundImg,platform;
var ball, slingshot;
var obj1, obj2;

var gameState = "Play";
var bg = "sprites/background.png";
var score = 0;
var count=0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;



    ground = new Ground(600,height,1200,20);


    obj1 = new Objective(800, 370); 
    obj2 = new Objective(710, 370);
    obj3 = new Objective(620, 370)
    obj4 = new Objective(530, 370)
    obj5 = new Objective(420, 370)
    obj6 = new Objective(310, 370)

    ball= new Ball(200,50);
    slingshot = new SlingShot(ball.body,{x:215, y:310});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    if(count >= 5){
        fill("yellow")
        text("GAME OVER",530, 200);
        gameState = "End"
    }
    if(score >= 1000){
        fill("yellow")
        text("YOU WIN!", 530,200)
    }
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    
    ground.display();
    obj1.display();
    obj1.score();
    obj2.display();
    obj2.score();
    obj3.display();
    obj3.score();
    obj4.display();
    obj4.score();
    obj5.display();
    obj5.score();
    obj6.display();
    obj6.score();
    
    ball.display();
    
    
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(ball.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        ball.trajectory = [];
       Matter.Body.setPosition(ball.body, {x: 300, y:200});
       slingshot.attach(ball.body);
       count++

    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
   
        bg = "sprites/background.jpg";


    backgroundImg = loadImage(bg);
 
}