/* TEST 1 - Speak Easy */

var answer; 
var count    = 0; // number of times ask question to doctor
var acronyms = 0; // number of acronym created

// Too Many Words
function tooManyWords(){
	
	answer = prompt("Please enter a phrase...");
	
	if (answer == null || typeof answer == undefined) {
	    return;
	}
	 // if empty string pass display message
	 answer.trim();
	 if (answer.length == 0) {
	 	alert("Acronym can not be created using empty string");
	 }	
	 // copy split data to temp variable 
	 var temp_line = answer.split(" ");
	 
	 var acronym ="";
	 var acronym_line ="";
	 
	 for ( var i = 0; i <temp_line.length; i++){
		 // create acronym 
		 acronym      += temp_line[i].charAt(0).toUpperCase(); 
		 
		 //copy acronym line with first letter upper case
		 acronym_line += temp_line[i].charAt(0).toUpperCase();
		 acronym_line += temp_line[i].substring(1, temp_line[i].length);
		 acronym_line +=  " ";
		 
	 }	 
	 // display acronym to user
	 alert (acronym + " stands for " + acronym_line);
	 
	 // count number of acronym created by user
     acronyms++;
	 
}


// Doctor Freethinker
function excuseMeDoctor(){
	
    answer = prompt("Please ask Dr. freethinker...");
	if (answer == null || typeof answer == undefined) {
	   alert("Puff, I don't need you either!");
	   return;
	}	
     // if empty string pass display message
	 answer.trim();
	 if (answer.length == 0) {
	 	alert("Please display valid message");
		return;
	 }	
	
	if (checkForYellingAndQuestion()) {
		alert("Do YOU want to do it instead?");
	} else if( checkForYelling()){
	    alert("Whoa !! where is the fire??");
    } else if (checkForQuestion()){
		alert("Indubitably");
	} else {
       alert("I understand. But you're still wrong!");
    }	
    count ++;
  
}


function checkForQuestion(){
	
	var result = (/(([a-z][?])|([a-z] [?]))$/.test(answer));		
	
	if  (result === true) {
		return true;
	} else{
      return false;		
	  console.log ("yes");
	}  
	return true;
	
}



function checkForYelling(){
	
	result = (/([A-Z][!]*)|([A-Z] [!]*)$/.test(answer));
	
	if  (result === true) {
		return true;
	} else{
        return false;	
	}  
}


function checkForYellingAndQuestion(){
	
    result = (/(([A-Z][?])|([A-Z] [?]))$/.test(answer));
	
	if  (result === true) {
		return true;
	} else{
      return false;		
	  console.log ("yes");
	}  
	
}	



// Record Keeper
function recordsKeeper(recordType){
	if ( recordType == 'acronyms') {
	    displayNumberOfAcronyms(); 	
		
	} else if (recordType == 'doctor') {
		displayNumberOfTimeSpeekWithDoctor();
		
	}	
  
} 

function displayNumberOfAcronyms(){
	alert("You have created " + acronyms + " made up acronyms"); 
}

function displayNumberOfTimeSpeekWithDoctor(){
	alert("You spoke with doctor " + count + " times."); 
	
}	