$( document ).ready(function() {
  "use strict";

let questions1 = {
        "instruction": "Roll the dice and answer the questions!",
        "questions": [
            {
                "type": "a",
                "ques_pic":"./assets/img/1_driver.png",
                "word1": "swimmer",
                "word2": "driver",
                "word3": "teacher",
                "word4": "student",
                "answer": "driver"
            },
            {
                "type": "b",
                "ques_word":"sailor",
                "ques_pic1":"./assets/img/1_sailor.png",
                "ques_pic2":"./assets/img/2_sailor.jpg",
                "answer": "./assets/img/1_sailor.png"
            },
            {
                "type": "a",
                "ques_pic":"./assets/img/3_teacher.png",
                "word1": "swimmer",
                "word2": "driver",
                "word3": "teacher",
                "word4": "student",
                "answer": "teacher"
            },
            {
                "type": "b",
                "ques_word":"singer",
                "ques_pic1":"./assets/img/1_singer.png",
                "ques_pic2":"./assets/img/2_singer.png",
                "answer": "./assets/img/2_singer.png"
            },
            {
                "type": "c",
                "ques_pic":"./assets/img/5_writer.png",
                "answer": "writer",
                "misspelled": "writor"
            },
            {
                "type": "a",
                "ques_pic":"./assets/img/2_swimmer.png",
                "word1": "swimmer",
                "word2": "driver",
                "word3": "teacher",
                "word4": "student",
                "answer": "swimmer"
            },
            {
                "type": "a",
                "ques_pic":"./assets/img/a_actor.png",
                "word1": "swimmer",
                "word2": "driver",
                "word3": "teacher",
                "word4": "student",
                "answer": "actor"
            },
            {
                "type": "c",
                "ques_pic":"./assets/img/c_baker.png",
                "answer": "baker",
                "misspelled": "backer"
            },
            {
                "type": "c",
                "ques_pic":"./assets/img/c_doctor.png",
                "answer": "doctor",
                "misspelled": "docter"
            },
            {
                "type": "b",
                "ques_word":"director",
                "ques_pic1":"./assets/img/1_director.png",
                "ques_pic2":"./assets/img/2_director.png",
                "answer": "./assets/img/2_director.png"
            },
            {
                "type": "b",
                "ques_word":"runner",
                "ques_pic1":"./assets/img/1_runner.png",
                "ques_pic2":"./assets/img/2_runner.png",
                "answer": "./assets/img/1_runner.png"
            }
        ]
    };
    console.log(questions1.questions[1].type);

/************ rolling dice **********/
let step = 0;
let curPos = 0; //means start position
let cntStep = 13; // number of steps

let proNo;
let suc = 0;         // count of success
let failure = 0;     // count of failure

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
  for(let i = 0 ; i < cntStep ; i++){
    let  left = $(".item" + (i+1)).css("left");
    let top = $(".item" + (i+1)).css("top");
    var tempT = parseInt(top.replace(/px/,""));
    ques_pos[i] = { "left":left, "top": (tempH + tempT)+"px" };

    //insert content
    if(i == 0 || i == (cntStep-1))
      continue;

    switch(questions1.questions[i-1].type){
      case "a":
        $(".item" + (i+1)).html("<img src = '" + questions1.questions[i-1].ques_pic + "'/>");
        break;
      case "b":
        $(".item" + (i+1)).html("<h2>" + questions1.questions[i-1].ques_word + "</h2>")
        break;
      case "c":
        $(".item" + (i+1)).html("<img src = '" + questions1.questions[i-1].ques_pic + "'/>");
        break;
      default:
        console.log("type error");

    }

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
     let ll,tt;
     curPos += pos;
     if(curPos >= (cntStep-1)){
        // moveCat(cntStep-1);
         ll =  parseInt(ques_pos[cntStep - 1].left.replace(/px/,""));
         tt = parseInt(ques_pos[cntStep - 1].top.replace(/px/,"")); 
         catInstance.set({left:ll,top:tt-80, opacity:1});
         canvas.renderAll(); 
         console.log("success = " + suc + " failure = " + failure);
         alert("ended");
         return;      
     }else{

         // catInstance.set("top","100px");
         ll =  parseInt(ques_pos[curPos].left.replace(/px/,""));
         tt = parseInt(ques_pos[curPos].top.replace(/px/,""));
         console.log("ll = " + ll + " tt = " + tt);
         catInstance.set({left:ll,top:tt-80, opacity:1});
         canvas.renderAll();
         if(curPos >= 1){          
            setTimeout(showProblem, 1000, curPos - 1);
            // setTimeout(showProblem, 1000, 2);
         }
     }

  }
  
  function showProblem(proIndex){
      let modal = document.getElementById("ques-Modal");
      proNo = proIndex;      

      modal.style.display = "block";

      if (questions1.questions[proIndex].type == "b"){
          console.log("question type is b");
          $(".modal-content").html("<h1 id='caption'></h1><div class='modal-content-img-a'><img class='b-ques-pic01' id='b-ques-pic01'><img class='b-ques-pic02' id='b-ques-pic02'></div>");
          let ques_pic01 = document.getElementById("b-ques-pic01");
          let ques_pic02 = document.getElementById("b-ques-pic02");
          let captionText = document.getElementById("caption");

          ques_pic01.src = questions1.questions[proIndex].ques_pic1;
          ques_pic02.src = questions1.questions[proIndex].ques_pic2;
          captionText.innerHTML = questions1.questions[proIndex].ques_word;

          $("#b-ques-pic01").click(function(e){
              let answer = ques_pic01.src;
              console.log("answer a1 = ",answer)
              if(answer == questions1.questions[proIndex].answer)
                suc++;
              else
                failure++;
              modal.style.display = "none";
              return;
          });
          $("#b-ques-pic02").click(function(e){
              let answer = ques_pic02.src;
              console.log("answer a1 = ",answer)
              if(answer == questions1.questions[proIndex].answer)
                suc++;
              else
                failure++;
              modal.style.display = "none";
              return;
          });

      }
      if(questions1.questions[proIndex].type == "a"){
          console.log("quesiton type is a");
          $(".modal-content").html("<div class='modal-content-img-a'><img class='a-ques-pic01' id='a-ques-pic01'></div><div class='modal-content-answer-a'>" + 
            "<h2 id='a-word1'></h2><h2 id='a-word2'></h2><h2 id='a-word3'></h2><h2 id='a-word4'></h2></div>");
          let ques_pic = document.getElementById("a-ques-pic01");
          let ans1 = document.getElementById("a-word1");
          let ans2 = document.getElementById("a-word2");
          let ans3 = document.getElementById("a-word3");
          let ans4 = document.getElementById("a-word4");

          ques_pic.src = questions1.questions[proIndex].ques_pic;
          ans1.innerHTML = questions1.questions[proIndex].word1;
          ans2.innerHTML = questions1.questions[proIndex].word2;
          ans3.innerHTML = questions1.questions[proIndex].word3;
          ans4.innerHTML = questions1.questions[proIndex].word4;

          $("#a-word1").click(function(e){
            let answer = $(this).text().trim();
            console.log("answerc = ", answer);  
            if(answer == questions1.questions[proNo].answer)
              suc++;
            else
              failure++;
            console.log("suc = " + suc + " failure = " + failure); 
            modal.style.display = "none";
            return;
          }); 
          $("#a-word2").click(function(e){
            let answer = $(this).text().trim();
            console.log("answerc = ", answer);
            if(answer == questions1.questions[proNo].answer)
              suc++;
            else
              failure++;
            console.log("suc = " + suc + " failure = " + failure);
            modal.style.display = "none"; 
            return;
          }); 
          $("#a-word3").click(function(e){
            let answer = $(this).text().trim();
            console.log("answerc = ", answer);
            if(answer == questions1.questions[proNo].answer)
              suc++;
            else
              failure++;
            console.log("suc = " + suc + " failure = " + failure); 
            modal.style.display = "none";
            return;
          }); 
          $("#a-word4").click(function(e){
            let answer = $(this).text().trim();
            console.log("answerc = ", answer);
            if(answer == questions1.questions[proNo].answer)
              suc++;
            else
              failure++;
            console.log("suc = " + suc + " failure = " + failure);
            modal.style.display = "none"; 
            return;
          }); 

      }
      if(questions1.questions[proIndex].type == "c"){
          console.log("question type is c"); 
          $(".modal-content").html("<div class='modal-content-img-a'><img class='a-ques-pic01' id='a-ques-pic01'></div><div class='modal-content-answer-a'>" + 
            "<h2 id='a-word1'></h2><h2 id='a-word2'></h2></div>");
          let ques_pic = document.getElementById("a-ques-pic01");
          let ans = document.getElementById("a-word1");
          let mis = document.getElementById("a-word2");

          ques_pic.src = questions1.questions[proIndex].ques_pic;
          ans.innerHTML = questions1.questions[proIndex].answer;
          mis.innerHTML = questions1.questions[proIndex].misspelled;   

          $("#a-word1").click(function(e){
            let answer = $(this).text().trim();
            console.log("answerc = ", answer);  
            if(answer == questions1.questions[proNo].answer)
              suc++;
            else
              failure++;
            console.log("suc = " + suc + " failure = " + failure); 
            modal.style.display = "none";
            return;
          }); 
          $("#a-word2").click(function(e){
            let answer = $(this).text().trim();
            console.log("answerc = ", answer);
            if(answer == questions1.questions[proNo].answer)
              suc++;
            else
              failure++;
            console.log("suc = " + suc + " failure = " + failure);
            modal.style.display = "none"; 
            return;
          }); 

      }
      // modal.style.display = "block";
  }
   
  
  
  $("#b-ques-pic01").click(function(e){
    let answer = (this).data('src');
    if(answer == questions1.questions[proNo].answer)
      suc++;
    else
      failure++;
    console.log("suc = " + suc + " failure = " + failure); 
    modal.style.display = "none";
  }); 
  $("#b-ques-pic02").click(function(e){
    let answer = (this).data('src');
    if(answer == questions1.questions[proNo].answer)
      suc++;
    else
      failure++;
    console.log("suc = " + suc + " failure = " + failure); 
    modal.style.display = "none";
  }); 
  // var x = $(".item2").css("left");
  // console.log(x);
  // var y = $(".item2").css("top");
  // console.log(y);
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

