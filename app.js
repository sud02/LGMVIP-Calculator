const displayEl = document.querySelector('.display');
const  acEl = document.querySelector('.ac');
const  pmEl = document.querySelector('.pm');
const  percentageEl = document.querySelector('.percentage');
const divisionEl = document.querySelector('.divison');
const multiEl= document.querySelector('.multi');
const subtractionEl = document.querySelector('.subtraction');
const additionEL = document.querySelector('.addition');
const equalsEl = document.querySelector('.equals');
const decimalEl= document.querySelector('.dot');
const number0El= document.querySelector('.number0');
const number1El= document.querySelector('.number1');
const number2El= document.querySelector('.number2');
const number3El= document.querySelector('.number3');
const number4El= document.querySelector('.number4');
const number5El= document.querySelector('.number5');
const number6El= document.querySelector('.number6');
const number7El= document.querySelector('.number7');
const number8El= document.querySelector('.number8');
const number9El= document.querySelector('.number9');
const numberElArray=[
  number0El, number1El, number2El, number3El, number4El, 
  number5El, number6El, number7El, number8El, number9El
];

let valueInMemory = null;
let operatorInMemory=null;
const getDisplayAsStr= () => {
  const numberDisplay= displayEl.textContent;
  return numberDisplay.split(',').join('');
}
const getDisplayAsNum= () => {
  return parseFloat(getDisplayAsStr());
}
const setStrAsValue= (valueStr) => {
  if(valueStr[valueStr.length - 1] === '.'){
    displayEl.textContent +=".";
    return;
  }
    const [wholeNumStr,decimalStr] =  valueStr.split(".");
    if(decimalStr){
      displayEl.textContent=parseFloat(wholeNumStr).toLocaleString()+"."+decimalStr;
    }
    else{
  displayEl.textContent = parseFloat(valueStr).toLocaleString();
    }
}
const numberClick =(numStr) =>{
  const numberDisplay= getDisplayAsStr();
  if(numberDisplay == '0')
  {
    setStrAsValue(numStr);
  }
  else{
   setStrAsValue(numberDisplay+numStr);
  }
}
const resultAsStr= ()=> {
  const currentNum=getDisplayAsNum();
  const value = valueInMemory=parseFloat(valueInMemory);
  let newValueNum;
  if(operatorInMemory== 'addition'){
    newValueNum=valueInMemory + currentNum;
  }else if(operatorInMemory== 'subtraction'){
    newValueNum=valueInMemory - currentNum;
  }else if(operatorInMemory== 'multi'){
    newValueNum=valueInMemory * currentNum;
  }else if(operatorInMemory== 'divison'){
    newValueNum=valueInMemory / currentNum;
  }
  return newValueNum.toString();
};
const operatorClick = (operation) =>{
  const currentValue = getDisplayAsStr();
  if(!valueInMemory)
  {
    valueInMemory=currentValue;
    operatorInMemory=operation;
    setStrAsValue("0");
    return;
  }
valueInMemory=resultAsStr();
operatorInMemory=operation;
setStrAsValue("0");

};
for(let i=0; i<numberElArray.length; i++){
  const El = numberElArray[i];
  El.addEventListener("click", () =>
  {
    numberClick(i.toString());
  })

}
decimalEl.addEventListener("click",()=> {
  const numberDisplay = getDisplayAsStr();
  if(!numberDisplay.includes('.')){
    setStrAsValue(numberDisplay+".")
  }
})
acEl.addEventListener("click",()=> {
  setStrAsValue("0");
  valueInMemory=null;
  operatorInMemory=null;
});
pmEl.addEventListener("click",()=>{
const presentValueNum= getDisplayAsNum();
const presentValueStr= getDisplayAsStr();

if(presentValueStr=="-0"){
  setStrAsValue("0");
  return;
}
if(presentValueNum>=0){
  setStrAsValue("-"+presentValueStr);

}else{
  setStrAsValue(presentValueStr.substring(1));
}

});

percentageEl.addEventListener("click",()=>{
  const percentage=getDisplayAsNum();
  const newValue=percentage/100;
  setStrAsValue(newValue.toString());
  valueInMemory=null;
  operatorInMemory=null;
});

additionEL.addEventListener("click",()=>{
  operatorClick('addition');
});
subtractionEl.addEventListener("click",()=>{
  operatorClick('subtraction');
});
multiEl.addEventListener("click",()=>{
  operatorClick('multi');
});
divisionEl.addEventListener("click",()=>{
  operatorClick('divison');
});
equalsEl.addEventListener("click",()=>{
  if(valueInMemory){
    const value = resultAsStr();
    setStrAsValue(resultAsStr());
    valueInMemory=null;
    operatorInMemory=null;
  }
});