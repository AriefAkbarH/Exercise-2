//running js secara keseluruhan dengan property window.onload
window.onload=function(){

    //default layar kalkulator
    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    // menampilkan kalkulasi yang dilakukan (default angka=0 jika belum dilakukan perhitungan)
    function updateDisplay(){
        const display = document.querySelector('.layarCalculator');
        display.value = calculator.displayValue;
    }

    //memanggil fungsi untuk menampilkan default angka 0 terlebih dahulu (karena belum ada kalkulasi yang dilakukan)
    updateDisplay();


    //menampilkan digit angka yang diklik
    function inputDigit(digit) {
        const { displayValue, waitingForSecondOperand } = calculator;
    
        if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
        } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    
        console.log(calculator);
    }


    // menampilkan digit decimal
    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand === true) return;

        if (!calculator.displayValue.includes(dot)) {

            calculator.displayValue += dot;
    }
    }


    // mengatur operasi yang dilakukan
    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator
        const inputValue = parseFloat(displayValue);

        if (operator && calculator.waitingForSecondOperand)  {
            calculator.operator = nextOperator;
            console.log(calculator);
            return;
        }

        if (firstOperand == null) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const currentValue = firstOperand || 0;
            const result = performCalculation[operator](currentValue, inputValue);

            calculator.displayValue = String(result);
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
        console.log(calculator);
    }

    // setting operator yang ada dikalkulator 
    const performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

        '**':(firstOperand,secondOperand) => firstOperand**secondOperand,

        '=': (firstOperand, secondOperand) => secondOperand
    
    };


    //menghapus kalkulasi dan mengembalikannya ke angka 0
    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
        console.log(calculator);
    }



    // memilih id tombolCalculator untuk pengoperasian tombol
    const keys = document.querySelector('#tombolCalculator');

    // mengatur event tombol
    keys.addEventListener('click', (event) => {
        const target = event.target;
        
        if (!target.matches('button')) {
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.value);
            updateDisplay();
            return;
        }

        if (target.classList.contains('desimal')) {
            inputDecimal(target.value);
            updateDisplay();
            return;
        }

        if (target.classList.contains('clear')) {
            resetCalculator(target.value);
            updateDisplay()
            return;
        }

        inputDigit(target.value);
        updateDisplay();
    });


}
