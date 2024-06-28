var playing = false;
var score;
var score_emoji;
var emoji_comment;
var trialsleft;
var step;//for random steps
var action;//for settime interval
var audio1 = new Audio("audio/knife1.mp3");
var audio2 = new Audio("audio/knife2.mp3");
var emojis = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];//for emojis
var emojiType;
const MAXSCORE = 999999;
const EMOJINUM = 16;
var BOMBTYPE = 15;
var emojiScore = [100, 100, 50, 50, 10, 10, 10, 10 ,10 ,10 ,10 ,10 ,10 ,10 ,10, 0] 
var juiceColors = ["images/splash-brown.png", "images/splash-red.png", "images/splash-red.png","images/splash-red.png","images/splash-yellow.png",
                   "images/splash-yellow.png","images/splash-yellow.png","images/splash-yellow.png","images/splash-yellow.png","images/splash-yellow.png",
                   "images/splash-yellow.png","images/splash-yellow.png","images/splash-yellow.png","images/splash-yellow.png","images/splash-yellow.png"];


$(function(){
    //click on start or reset button
    $('#front').show();
    $("#startReset").click(function () {
        // alert("Start!"); // for debug
        if(playing == true){
            //if we are playing
            location.reload();//reload page
        }else{
            //if we are not playing from before
            $('#front').hide();
            $('#score').show();
            playing = true;
            //set score to 0
            score = 0;
            $("#scoreValue").html(score);

            //show trials left box
           
            $('#trialsleft').show();
            trialsleft=3;
            addhearts();
    
            //hide game over box
            $('#gameOver').hide();
    
            //change button to reset game
            $('#startReset').html('RESET')
    
            //start action
            startAction();
        }
    });

    //slice a emoji
    $("#emoji1").mouseover(function () { 
        console.log(emojiType); // for debug
        if (emojiType != BOMBTYPE) {
            score += emojiScore[emojiType];// increase score
            $("#scoreValue").html(score);

            //play sound
            if(emojiType <= 4) audio2.play();
            else audio1.play();

            //stop emoji
            clearInterval(action);

            //hide emoji
            $('#emoji1').hide("explode",500);//slice emoji
            var juiceColor = juiceColors[emojiType]; // 获取juice颜色
            
            showJuice(juiceColor);
            
            //send a new emoji
            setTimeout(startAction,500);
        }
        else{
            //game over
            // alert("1emojiType == BOMBTYPE"); // for debug
            playing=false;//we are ot playing any more
            $("#score").hide();
            $('#startreset').html('Start Game');
            $('#gameOver').show();
            if(score < 100){
                score_emoji = "🙄"
                emoji_comment = "Are You SLEEPING?"
            }
            else if(score < 200){
                score_emoji = "🤣"
                emoji_comment = "Not Bad, Huh?"

            }
            else if(score < 500){
                score_emoji = "😋"
                emoji_comment = "Well Done!"

            }
            else {
                score_emoji = "😍"
                emoji_comment = "Legendary Emoji Ninja!"
            }
            $('#gameOver').html('<img src="images/GameOver.png" width="100%"><p>' + score_emoji +' '+ score + '<br/>' + emoji_comment + '</p>')
            
            $('#trialsleft').hide()

            // End game
            stopAction();
        }
    });
     

  //functions

   //addhearts
   function addhearts() {
    $('#trialsleft').empty();
    for(i = 0 ; i < trialsleft ; i++){
        $('#trialsleft').append('<img src="images/wrong.png" , class="life">');
    }
}

    function showJuice(color) {
        
        var juice = $('<div class="juice"></div>').css({
            'background-color': '#ff0000',
            
            'background-image': color, // 设置背景图像
            'background-size': 'cover', // 以 cover 方式填充背景
            'position': 'absolute',
            'left': $('#emoji1').offset().left,
            'top': $('#emoji1').offset().top,
            'width': '50px', // 汁液宽度
            'height': '50px', // 汁液高度
            'z-index': '1' // 确保汁液位于 emoji 下方
        });
    
        
        $('body').append(juice);
    
        // juice逐渐消失
        setTimeout(function () {
            juice.fadeOut(1000, function () {
               $(this).remove(); 
            });
        }, 1000); 
    }
  //start action
  function startAction(){
      //generate random emoji
      $('#emoji1').show();

      //choose random emoji
      chooseRandom();
      //random position
      $('#emoji1').css({
          'left': Math.round(550 * Math.random()),
          'top': -50
      });
      //generate random step
      step=1 + Math.round(5 * Math.random());//change steps
      //descend emojis down by 10ms
      action = setInterval(function(){
          //move emoji by one step
          $('#emoji1').css('top', $('#emoji1').position().top + step);

          //check if the emoji is too low
          if($('#emoji1').position().top > $('#emojicontainer').height()-50){
                //yes it is low
                // check trails left
                if(trialsleft > 1 || (trialsleft == 1 && emojiType == BOMBTYPE)){
                    //reduce trials by one
                    if(emojiType != BOMBTYPE)
                        trialsleft--;
                    addhearts();
                    $("#emoji1").show();
                    //choose random emoji
                    chooseRandom();
                    //random position
                    $('#emoji1').css({
                        'left': Math.round(550 * Math.random()),
                        'top': -50
                });
                //generate random step
                step= 1 + Math.round(5 * Math.random());//change steps
              }else{
                //game over
                // alert("1emojiType == BOMBTYPE"); // for debug
                playing=false;//we are ot playing any more
                $("#score").hide();
                $('#startreset').html('Start Game');
                $('#gameOver').show();
                if(score < 100){
                    score_emoji = "🙄"
                    emoji_comment = "Are You SLEEPING?"
                }
                else if(score < 200){
                    score_emoji = "🤣"
                    emoji_comment = "Not Bad, Huh?"

                }
                else if(score < 500){
                    score_emoji = "😋"
                    emoji_comment = "Well Done!"

                }
                else {
                    score_emoji = "😍"
                    emoji_comment = "Legendary Emoji Ninja!"
                }
                $('#gameOver').html('<img src="images/GameOver.png" width="100%"><p>' + score_emoji +' '+ score + '<br/>' + emoji_comment + '</p>')
                
                $('#trialsleft').hide()

                // End game
                stopAction();              
            }
          }

          // check if the score is overflow
          if (score >= MAXSCORE) {
            //game over
            // alert("1emojiType == BOMBTYPE"); // for debug
            playing=false;//we are ot playing any more
            $("#score").hide();
            $('#startreset').html('Start Game');
            $('#gameOver').show();
            if(score < 100){
                score_emoji = "🙄"
                emoji_comment = "Are You SLEEPING?"
            }
            else if(score < 200){
                score_emoji = "🤣"
                emoji_comment = "Not Bad, Huh?"

            }
            else if(score < 500){
                score_emoji = "😋"
                emoji_comment = "Well Done!"

            }
            else {
                score_emoji = "😍"
                emoji_comment = "Legendary Emoji Ninja!"
            }
            $('#gameOver').html('<img src="images/GameOver.png" width="100%"><p>' + score_emoji +' '+ score + '<br/>' + emoji_comment + '</p>')

            $('#trialsleft').hide()

            // End game
            stopAction();
        }
      },10);
  }

 
  //choose random emojis
  function chooseRandom(){
    //   emojiType = Math.round(15*Math.random());
      emojiType = Math.round(2*Math.random()) + 13; // Modified to debug Bomb
      $('#emoji1').attr('src','images/' + emojis[emojiType]+'.png');
  }

 
   // Stop Action
   function stopAction(){
    clearInterval(action);
    $('#emoji1').hide();
   }



});
