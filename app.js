var numberInstMemo=0, //number instant in memo
	resNum=0, //resultat as a number
	resText="", //resultat in forme text
	prevTypeOperator="", //(sum or minus...)
	d,
	v,
	dv=1;


//resNum=numberInstMemo+resNum;


//Event :: animation after the click

function animateButtons(idButton){

	document.getElementById(idButton).style.animation=null;

	setTimeout(function(){ 
		document.getElementById(idButton).style.animation= "myScaleAnimate 500ms";
	}, 30);

}


//Pass a numbre after clicking it
function passANumber(digit) {

	let idButton='num'+digit;
	animateButtons(idButton);

	if(resText=='ans'){
		resText="";
		resNum=0;
		ans=numberInstMemo;
		numberInstMemo=0;
		v='f';
		document.getElementById("resNum").innerHTML = 0;
		prevTypeOperator='sum';

	}

	
	if(v=='v'){
		dv=dv/10;
		numberInstMemo=numberInstMemo;
		numberInstMemo=digit*dv+numberInstMemo;

		resText=resText+""+digit;
		d=1;
	}else{
		numberInstMemo=numberInstMemo*10;
		numberInstMemo=digit+numberInstMemo;

		resText=resText+""+digit;
		d=1;
	}

	document.getElementById("resText").innerHTML = resText;
	

}

//function the operations (plus, moins, multiple...)

function operations(typeOperator) {
	
	if(typeOperator=='comma' && v!='v'){
		resText=resText+".";
		v='v';
		dv=1;
		animateButtons('comma');
	}else if(typeOperator!='comma'){
		v='f';
	}

	if(typeOperator=="sum"){
		resText=resText+"+";
		animateButtons('sum');	        
	}else if(typeOperator=="minus"){
		resText=resText+"-";
		animateButtons('minus');


	}else if(typeOperator=="times"){
		resText="ans"+"×";
		animateButtons('times');


	}else if(typeOperator=="divided"){
		resText="ans"+"÷";
		animateButtons('divided');

	}


	if(typeOperator!='comma'){

		if(prevTypeOperator=='sum'){
			resNum=numberInstMemo+resNum;
			numberInstMemo=0;

		}else if(prevTypeOperator=='minus'){
			resNum=resNum-numberInstMemo;
			numberInstMemo=0;

		}else if(prevTypeOperator=='times' && d!=0){
			resNum=resNum*numberInstMemo;
			numberInstMemo=0;        

		}else if(prevTypeOperator=='divided' && d!=0){
			resNum=resNum/numberInstMemo;
			numberInstMemo=0;    

		}

		prevTypeOperator=typeOperator;
		
	}
	
	
	if(typeOperator=='equal'){

		resText='ans';
		animateButtons('equal');
		
	}

	document.getElementById("resText").innerHTML = resText;
	document.getElementById("resNum").innerHTML = resNum;
	
	d=0;


}

//Delete function... Restart again.. Delet all memory..
function deleteAll(){
	
	animateButtons('deleteAll');
	
	resText="";
	resNum=0;
	numberInstMemo=0;
	document.getElementById("resNum").innerHTML = resNum;

	prevTypeOperator='sum';
	operations('z');
	prevTypeOperator='sum';

	document.getElementById("resText").innerHTML = "___";
}

//Function for delete a single digit
function deletKeyFunction(){
	animateButtons('deleteKey');
	if(resText=='ans'){
		deleteAll();
	}else if(v=='v'){

		numberInstMemo=0;
		operations('z');
		resText='ans.';
		

	}else{
		numberInstMemo=Math.floor(numberInstMemo/10);

	}

	let splitResText=resText.split("");
	let lengthSplitResText=splitResText.length-1;
	resText=resText.substring(0, lengthSplitResText);

	document.getElementById("resText").innerHTML = resText;

}

prevTypeOperator='sum';


document.getElementById("resText").innerHTML = "___";

//onkeyup function: When pressing on a touch-keyboard(button)
function touchKeyboard(event){
	let eventKey=event.key;
	if(eventKey=='Enter' || eventKey=='='){ //Equal
		operations('equal');
	}else if(eventKey==0){ //Number 0 (0->9)
		passANumber(0);
	}else if(eventKey==1){
		passANumber(1);
	}else if(eventKey==2){
		passANumber(2);
	}else if(eventKey==3){
		passANumber(3);
	}else if(eventKey==4){
		passANumber(4);
	}else if(eventKey==5){
		passANumber(5);
	}else if(eventKey==6){
		passANumber(6);
	}else if(eventKey==7){
		passANumber(7);
	}else if(eventKey==8){
		passANumber(8);
	}else if(eventKey==9){
		passANumber(9);
	}else if(eventKey=='*'){ // Multiple
		operations('times');
	}else if(eventKey=='+'){ // Sum or addition
		operations('sum');
	}else if(eventKey=='-'){ // Subtraction
		operations('minus');
	}else if(eventKey=='.'){ // Point //comma
		operations('comma');
	}else if(eventKey=='/'){ //divided
		operations('divided');
	}else if(eventKey=='Escape'){ //Restart again
		deleteAll();
	}else if(eventKey=='Backspace'){ // Delete a single digit
		deletKeyFunction();
	}
}