let box_score = 45; // 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9
let dice_roll = null;
let checked_num = [];

// Declare other useful DOM elements.
const result = $('#result');
const box_num = $('td');


/**
This function sets up the game when the web page loads. 
*/
window.onload = function() {
  //disable submit button at the very beginning 
  $('#submit_button')[0].disabled = true;
  
  //add event listeners to the box numbers
  for(let i = 0; i < 9; ++i){
    let id_name= '#c' + i;
    box_num.eq(i).click(function(){
    $(id_name)[0].checked=!$(id_name)[0].checked;
    });
  }
   
};

/**
This function rolls two dice, injects the result of the dice roll, disables/enables buttons.
*/
function roll_dice() {
  //if the current box score is greater than 6
  if(box_score > 6){
  
  let dice_1 = 1 + Math.floor(6*Math.random());
  let dice_2 = 1 + Math.floor(6*Math.random());
  
  //add results of rolling two dices
  dice_roll = dice_1 + dice_2;

  let dice_roll_text = `${dice_1} + ${dice_2} = ${dice_roll}`;
  
  //inject text
  result.html(result.html() + dice_roll_text);
  
  //disable the roll dice button
  $("#roll_button")[0].disabled = true;
  
  //enable the submit button
  $('#submit_button')[0].disabled = false;
  
  }
  else{
  roll_die();
  }

  
}

/**
This function returns the sum of checked numbers.
@return {number} the sum of checked values
*/
function sum_checked_values() {
  
  //reset the array which stores the checked values
  checked_num = [];
  let sum = 0;

  for(let i = 0; i < 9; ++i){
  
    let id_name= '#c' + i;
  
    if($(id_name)[0].checked === true){
      checked_num.push(i+1);
    }
 
  }
  
  //sum up the checked values
  for(let i = 0; i < checked_num.length; ++i){
    sum = sum+checked_num[i];
  }
  
  return sum;
}

/**
This function handles valid and invalid user inputs.
*/
function check_submission() {

  let submission = sum_checked_values();
  //deal with invalid submission
  if(dice_roll !== submission){
    alert('The total of the boxes you selected does not match the dice roll. Please make another selection and try again.');
  }
  else{
  //deal with valid submission...
  
  //disable checkboxes
  for(let n of checked_num){
    let index = n-1;
    //disable the numbers
    box_num.eq(index).off('click');
    //uncheck & disable the checkboxes
    let id_name = '#c' + index;
    $(id_name)[0].checked = false;
    $(id_name)[0].disabled = true;
  }

  //disable the submit button
  $('#submit_button')[0].disabled = true;
  
  //enable the roll dice button
  $("#roll_button")[0].disabled = false;
  
  //delete text
  result.html('Result: ');
  
  //update the game score
  box_score = box_score - submission;
  
  }
  
 
}


/**
This function rolls one die, injects the result of the dice roll, disables/enables buttons.
*/
function roll_die() {
  //roll single die
  dice_roll = 1 + Math.floor(6*Math.random());
  
  let dice_roll_text = `${dice_roll}`
  
  //inject text
  
  result.html(result.html() + dice_roll_text);
  
  //disable roll dice button
  $("#roll_button")[0].disabled = true;
  
  //enable submit buttons
  $('#submit_button')[0].disabled = false;
  
}


/**
This function outputs the final score when the game is ended.
*/
function finish() {

  alert(`Your score is ${box_score}.`);

}