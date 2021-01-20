//Create variables here
var dogImage,dogImage2
var dog,happyDog,foodS,foodStock
var  db 
function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png")
  dogImage2 = loadImage("images/dogImg1.png")

}

function setup() {
  createCanvas(500,500);
   db = firebase.database();
 
  dog = createSprite(250,250)
  dog.addImage("dog",dogImage)
  dog.scale = 0.2

  foodStock = db.ref("Food")
  foodStock.on("value",readStock)

 
  
}


function draw() {  
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImage2)
  }

  

  drawSprites();
  fill ("white")
  textSize(20)
  text ("No:of Milk Bottles left = "+foodS,100,100)

}

function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  db.ref("/").update({
    Food:x
  })
}

function readStock(data){
  foodS = data.val();
}
