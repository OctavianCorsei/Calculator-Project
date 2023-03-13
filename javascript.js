//alert('works');

//variable initialization
let calculatorButtons = document.getElementById('calcButtons');
let clearButton = document.getElementById('clearButton');
let resultText = document.getElementById('topResult');
let opHistory = document.getElementById('opHistory');
let del = document.getElementById('backSpace');

let firstNumber = undefined;
let secondNumber = undefined;
let operator = '';
let decimalPoint = false;
let showingResult = false;

//set event listeners
clearButton.addEventListener('click', resetCalc);
calculatorButtons.addEventListener('click', buttonPressed);
del.addEventListener('click', backspaceAction);

function buttonPressed(e){
    if (resultText.textContent == 'ERROR!'){
        resultText.textContent = '';
        opHistory.textContent = '';
        firstNumber = undefined;
        secondNumber = undefined;
        operator = '';

    }

    if(e.target.classList.contains('digit-button')){
        if(showingResult){
            resultText.textContent = '';
            showingResult = false; 
        }
        if(e.target.textContent == '.' && decimalPoint == false){
            resultText.textContent += e.target.textContent;
            decimalPoint = true;
        }else if(e.target.textContent != '.'){
            resultText.textContent += e.target.textContent;
        }
    }else if(e.target.classList.contains('operator')){
        if(firstNumber == undefined){
            firstNumber = Number(resultText.textContent);
            resultText.textContent = '';
            operator = e.target.textContent;
        }else if(secondNumber == undefined && showingResult){
            operator = e.target.textContent;
            resultText.textContent = '';
            showingResult = false;
        }
        else if(secondNumber == undefined && e.target.textContent != '='){
            console.log('got here');
            secondNumber = Number(resultText.textContent);
            let calcResult = calcOperation(operator, firstNumber, secondNumber);
            resultText.textContent = calcResult;
            showingResult = true;
            firstNumber = calcResult;
        }else if(e.target.textContent == '='){
            secondNumber = Number(resultText.textContent);
            let calcResult = calcOperation(operator, firstNumber, secondNumber);
            resultText.textContent = calcResult;
            showingResult= true;
            firstNumber = calcResult;
            secondNumber = undefined;
        }
    }else if (e.target.classList.contains('squared')){
        firstNumber = Math.sqrt(Number(resultText.textContent));
        resultText.textContent = firstNumber;
        showingResult = true;
    }
}

function resetCalc(e){
    console.log(typeof(Number(resultText.textContent)));

    resultText.textContent = '';
    opHistory.textContent = '';
    firstNumber = undefined;
    secondNumber = undefined;
    operator = '';

}

function backspaceAction(e) {
    let currentnumber = resultText.textContent;
    resultText.textContent = currentnumber.slice(0, -1);
}

function calcOperation(operator, firstNumber, secondNumber){
    switch(operator){
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case 'x':
            return firstNumber * secondNumber;
        case '/':
            if(secondNumber) return firstNumber / secondNumber;
            return 'ERROR!';
        case '=':
            return firstNumber;
        default:
            return 0;
    }
}
