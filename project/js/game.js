//console.log("game.js");


var image_array=[];
var image_timer_array =[];
var image_display_array =[];
var image_select_array =[];
var remaing_sec = 5;
var games_played=0;
var games_win=0;
var current_score =0;

// after webpage upload save all images to array and load game
$(document).ready(init_Array);
	
	
function init_Array(){
   image_array.push("apple.jpg");	
   image_array.push("avacado.jpg");
   image_array.push("bananas.jpg");
   image_array.push("blueBerry.jpg");
   image_array.push("cherries.jpg");
   image_array.push("citrus.jpg");
   image_array.push("dadam.jpg");
   image_array.push("grape.jpg");
   image_array.push("mango.jpg");
   image_array.push("melon.jpg");
   image_array.push("orange.jpg");
   image_array.push("pear.jpg");
   image_array.push("pineapple.jpg");
   image_array.push("rasBerry.jpg");
   image_array.push("strawBerry.jpg");
   image_array.push("coconut.jpg");
   image_array.push("kiwi.jpg");
   loadGame();
}


//start game
function loadGame(){
	//display background image to timer table and selected table
	var output ="<tr>" 
	for (var i=0 ;i<4; i++){
    	output +="<td>"
	    output +="<img src= \"image/background.jpg\"";
		output += "alt=\"background pic\" width = 75 height=75/>"
	    output +="</td>"
	}
    output +="</tr>";	
	$("#countdown").hide();
	$("#message").hide();
	$("#timer_tbl").html(output);
	$("#display_tbl").html(output);
	
	//display background image to display all images table
	var displayAllOutput ="";
	for (var j=0 ; j<2; j++){
		displayAllOutput +="<tr>";
		for (var i=0 ;i<8; i++){
    	    displayAllOutput +="<td>";
			displayAllOutput +="<img src= \"image/background.jpg\"";
		    displayAllOutput += "alt=\"background pic\" width = 75 height=75/>";
	        displayAllOutput +="</td>";
	    }
		displayAllOutput +="</tr>";
	}
	$("#displayAll_tbl").html(displayAllOutput);
	
}

// start button click init data , display timer table images and start time
function startGame(){
    image_timer_array   =[];
    image_display_array =[];
    image_select_array  =[];
	current_score =0;
	
	// hide message 
	$("#message").hide();
	$("#score_btn").text("Current Score:"+ current_score);
	fillArrayWithRandomNumber(image_timer_array, 4);

	var output = createTableRowQuery(image_timer_array, "Please memorize the display images", false);
	$("#timer_tbl").html(output);
	$("#timer_tbl").fadeIn(2000);
	$("#countdown").fadeIn(1000);
	
	var intervalSec = setInterval(displayTimer, 1000);
	remaing_sec = 5;
	var waitSec     = setTimeout(hideImages, 5000, intervalSec);
	$("#display_tbl").hide();
	$("#displayAll_tbl").hide();
}


// update time remain info
function displayTimer() {
	remaing_sec--;
	//console.log(remaing_sec);
	$("#countdown").text("Countdown:" + remaing_sec);
}

//After time out, hide images, display selected image table and all the images to choose 
function hideImages(intervalId){
	// hide timer table
	clearTimeout(intervalId);
	//console.log("1 second has Passed"); 
    $("#timer_tbl").hide();	
	$("#countdown").hide();
	
	//display default selected table with background images
	displaySelectedImages();
	$("#display_tbl").fadeIn(2000);
	
	//display all images randomly
	fillArrayWithRandomNumber(image_display_array, 16);
	//console.log(image_display_array);
	var output = createTableRowQuery(image_display_array,"Please identify the previously display images..", true);
	//console.log(output);
	$("#displayAll_tbl").html(output);
	$("#displayAll_tbl").fadeIn(2000);
	
}

//
function fillArrayWithRandomNumber(i_array, count){
	
	var image_num=0;
	// empty the array
	i_array.length = 0;

	for (var j=0; j < count; j++){
		image_num = getRandomNumber();
		
		if (i_array.length == 0){
			i_array[0]= image_num;
			
		} else {
			while (i_array.includes(image_num)) {
				image_num = getRandomNumber();
				//console.log(image_num);
			}
			i_array[j]= image_num;
		}
	}
	return i_array;
}


function createTableRowQuery(i_array, table_caption, addclick){
	if (i_array.length == 0) return "No data has been selected"; 
	var output = "<caption>";
	    output += table_caption +"</caption>";
	    //output +="<tr>" 
	for (var i=0 ; i< i_array.length; i++){
		if (i== 0 ||(i_array.length >8 && i == 8)){
			output +="<tr>" 
		}
    	output +="<td>";
	    output +="<img ";
       	if (addclick){
			output +="onClick = \"selectClickImage(";
		    output +=  i ;
		    output += ");\"";
		}	
		output +="src= \"image/";
		output += image_array[i_array[i]];
		output +="\"";
		output += "alt=\"";
		output += image_array[i_array[i]];
		output += "\" width = 75 height=75/>"
	    output += "</td>"
		if ( i == 7){
			output +="</tr>" 
		}
	}
    output +="</tr>";	
	
	return output;
}


function getRandomNumber(){
	var number = (Math.floor(Math.random()*(16))+1);
	return number;
}

function displaySelectedImages(){
	var output = "<caption> Selected images... </caption>"
        output +="<tr>" 
	for (var i=0 ;i<4; i++){
    	output +="<td>";
	    output +="<img  src= \"image/";
		if (image_select_array.length == 0 || image_select_array.length <= i){
			output += "background.jpg";
		} else {
			output += image_array[image_select_array[i]];
		}
		
		output +="\""
		output += "alt=\"background pic\" width = 75 height=75/>"
	    output +="</td>"
	}
    output +="</tr>";	
	//console.log(output);
	$("#display_tbl").html(output);
}	


function updateGameScore(){
	$("#games_played_btn").text("Games Played: "+ games_played);
	$("#games_win_btn")   .text("Games Won:"    + games_win   );
}

function displayResult(){
	$("#message").fadeIn(1000);
	if (current_score == 4){
		$("#message").text("Congratulation you have won this round.\n" + "Your Score is: " + current_score + "/4");
		games_win++;
	} else {
		$("#message").text("!!Sorry you have lost this round!!\n" +"Your Score is: " + current_score + "/4");
	}
	$("#score_btn").text("Current Score:"+ current_score + "/4");
	games_played++;
	updateGameScore();
}


/* function displayGameInfo(){
	alert (  " How to play Memory Game? \n\n"
	       + " 1. On start 4 images will be display on screen.\n"
		   + " 2. Player should remember the images. \n"
		   + " 3. After 5 sec, the images will disappear. \n"
		   + " 4. Multiple images will display on screen,player must select 4 images that match previously displayed images. \n"
		   + " 5. After selecting all 4 images, program will display result. \n"	
           + " 6. Program will display game winning score. \n"	
           + " 7. Player can continue by clicking start button." );
} */


function selectClickImage (id){
	
	//console.log(id);
	var ImagefileName = image_array[image_display_array[id]];
	//console.log(ImagefileName);
	
	
	image_select_array.push(image_display_array[id]);
	displaySelectedImages();
	console.log(image_select_array.length);
	if (image_select_array.length == 4){
		$("#displayAll_tbl").hide();
		var output = createTableRowQuery(image_timer_array, "Previously display images", false);
	    $("#timer_tbl").html(output);
	    $("#timer_tbl").fadeIn(2000);
		for (var counter =0; counter <4 ; counter++){
		    if (image_select_array[counter] == image_timer_array[counter]) current_score++;
		}
		//console.log(current_score);
		displayResult();
		return;
	}
	
	
	
	image_display_array.splice(id, 1);
	
	
	
	/*---------------------------------------*/
	fillArrayWithRandomNumber(image_display_array, 16);
	//console.log(image_display_array);
	var output = createTableRowQuery(image_display_array,"Please identify the previously display images..", true);
	//console.log(output);
	$("#displayAll_tbl").html(output);
	$("#displayAll_tbl").fadeIn(2000);
	
	
	
} 

//$(document).ready(function(){
 // $("#info_btn").click(displayGameInfo);	
//});	

