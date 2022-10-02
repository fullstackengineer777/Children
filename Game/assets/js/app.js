$( document ).ready(function() {


/************ rolling dice **********/
let step = 0;
let curPos = 0; //means start position
let cntStep = 13; // number of steps

function rollDice() {
  const dice = [...document.querySelectorAll(".die-list")];
  dice.forEach(die => {
    toggleClasses(die);
    step = getRandomNumber(1, 6);  
    die.dataset.roll = step;
  });
  setTimeout(moveCat ,2000 , step);
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function endGame(){

// }
document.getElementById("start-btn").addEventListener("click", rollDice);
// document.getElementById("end-btn").addEventListenner("click", endGame);

/***********moving cat************/



  var ques_pos = new Array(11);
  var h = $(".gameboard").css("height");
  var headerH = $(".header-section").css("height");
  console.log("headerH = ", headerH);
  var tempH = parseInt(headerH.replace(/px/,""));
  //initialize the positions of questions.
  for(i = 0 ; i < 13 ; i++){
    let  left = $(".item" + (i+1)).css("left");
    let top = $(".item" + (i+1)).css("top");
    var tempT = parseInt(top.replace(/px/,""));
    ques_pos[i] = { "left":left, "top": (tempH + tempT)+"px" };
  }

  console.log("ques_pos = ", ques_pos);

  document.getElementById("game-area").setAttribute("width","600px");
  document.getElementById("game-area").setAttribute("height",h);
  document.getElementById("game-area").style.position = "absolute";

  var canvas = new fabric.Canvas("game-area");
  // canvas.setHeight(h);
  // canvas.renderAll();
  var catImg = document.getElementById('cat-img');
  var catInstance = new fabric.Image(catImg, {left:300,top:10, opacity:1});//scaleX:0.2,scaleY:0.2,
  // var catInstance = new fabric.Image(catImg, {left:100,top:100,angle:30,opacity:0.85});
  canvas.add(catInstance);

  function moveCat(pos){
   curPos += pos;
   if(curPos >= cntStep){
      alert("ended");
      return;
   }

   // catInstance.set("top","100px");
   var ll =  parseInt(ques_pos[curPos].left.replace(/px/,""));
   var tt = parseInt(ques_pos[curPos].top.replace(/px/,""));
   console.log("ll = " + ll + " tt = " + tt);
   catInstance.set({left:ll,top:tt-80, opacity:1});
    canvas.renderAll();
  }
   
  var x = $(".item2").css("left");
  console.log(x);
  var y = $(".item2").css("top");
  console.log(y);

  // $("#start-btn").click(function(e){
  // });
  moveCat(0); //move the cat to start position.

});


















// 

  
//    var canvas = document.getElementById("game-area");

//     var ctx = canvas.getContext("2d");
//     var img = document.getElementById("cat-img");
//    ctx.drawImage(img, 0, 0,100,100);

// });

// var cat;
// var gameArea = document.getElementById("game-area");
// var context = gameArea.getContext("2d");
// // var cat_img = new Image('../img/tiger.jpg');
// var cat_img = document.getElementById('cat-img');
// context.drawImage(cat_img,10,10,100,100);

// var width = $("#game-area").css("width");
// var height = $("#game-area").css("height");
// console.log("w = " + width + " height = " + height);

// /***load cat ***/
// cat = new component( 100, 100, width/2, height/2);
// // cat.update();


// // function startGame() {
// //   myGamePiece = 
// //   myGameArea.start();
// // }

// function component(width, height, x, y){
//    this.width = width;
//    this.height = height;
//    this.x = x;
//    this.y = y;   
//    this.update = function(){
//       const cat_img = new Image("../img/tiger.png");

//       context.drawImage(cat_img,width,0,500,500);
//    }
// }

