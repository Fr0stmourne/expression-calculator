function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const exprArr = expr.replace(/\s/g, '').split('');
    const brackets = ['(', ')'];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => {
            if (b === 0) throw new Error("TypeError: Division by zero.");
            return a / b;
        }
    }
    const priority = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1
    }
    const terminator = '.';
    const postfixNotation = [];
    const operatorStack = [];

    function isNumber(value) {
        return (!(Object.keys(operators).includes(value) || brackets.includes(value) || value === terminator))
    }

    function isOperator(value) {
        return Object.keys(operators).includes(value);
    }

    function isLeftParenthesis(value) {
        return value === brackets[0];
    }

    function isRightParenthesis(value) {
        return value === brackets[1];
    }

    let i = 0;

    exprArr.push(terminator);
    while (exprArr.length) {
        // if number => to the stack
        // console.log(exprArr, postfixNotation, operatorStack);
        if (isNumber(exprArr[i])) {
            // find first bracket or operator (get full number)
            // console.log(!isNumber[1]);
            // console.log(exprArr.findIndex((el, index) => !isNumber(el) && index > i));
            postfixNotation.push(exprArr.splice(i, Math.max(exprArr.findIndex((el, index) => !isNumber(el) && index > i) - i, 1)).join(''));
        }
        // console.log(exprArr, postfixNotation, operatorStack);
        // if operator
        if (isOperator(exprArr[i])) {
            while ((isOperator(operatorStack[operatorStack.length - 1]) && priority[operatorStack[operatorStack.length - 1]] >= priority[exprArr[i]]) ||
                isRightParenthesis(operatorStack[operatorStack.length - 1])) {
                postfixNotation.push(operatorStack.pop());
            }

            operatorStack.push(exprArr.shift());
        }

        if (isLeftParenthesis(exprArr[i])) {
            operatorStack.push(exprArr.shift());
        }

        if (isRightParenthesis(exprArr[i])) {
            if (!(operatorStack.includes(brackets[0]))) throw new Error("ExpressionError: Brackets must be paired");
            while (!(isLeftParenthesis(operatorStack[operatorStack.length - 1]))) {
                postfixNotation.push(operatorStack.pop());
            }
            if (isLeftParenthesis(operatorStack[operatorStack.length - 1])) {
                exprArr.shift();
                operatorStack.pop();
            }
        }

        if (exprArr[i] === terminator) exprArr.shift();
    }

    while (operatorStack.length) {
        if (brackets.includes(operatorStack[operatorStack.length - 1])) throw new Error("ExpressionError: Brackets must be paired");
        postfixNotation.push(operatorStack.pop());
    }

    // Calculator
    let operandStack = [];
    postfixNotation.forEach(el => {
        if (isNumber(el)) operandStack.push(el);
        if (isOperator(el)) {
            let b = operandStack.pop();
            let a = operandStack.pop();
            operandStack.push(operators[el](+a, +b));
        }
    })

    return operandStack[0];
}




module.exports = {
    expressionCalculator
}