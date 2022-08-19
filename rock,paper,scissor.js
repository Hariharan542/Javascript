let person = prompt("Please enter your choice:");
console.log("person:"+person);
var str=['rock','paper','scissor'];
var c= str[Math.floor(Math.random()*3)];
console.log("computer:"+c);
if(person=="rock"){
    if(c=="rock") console.log("Draw");
    else if(c=="paper") console.log("computer wins")
    else console.log("person wins");
}else if(person=="scissor"){
    if(c=="scissor") console.log("Draw");
    else if(c=="rock") console.log("computer wins")
    else console.log("person wins");
}else if(person=="paper"){
    if(c=="paper") console.log("Draw");
    else if(c=="scissor") console.log("computer wins")
    else console.log("person wins");
}else{
    alert("please enter rock or scissor or paper");}
  
  
