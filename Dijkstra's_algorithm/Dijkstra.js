let input = '(2+3)^2^8-(6+7)/2';
console.log('Input expression: ', input);

let output = '';
let stack = new Array();

function priority(symb){
	if (symb == '(' || symb == ')'){
		return 1
    }
	else if (symb == '+' || symb == '-'){
		return 2
    }
	else if (symb == '*' || symb == '/'){
		return 3
    }
	else if (symb == '^'){
		return 4
    }
	else return 0 
}

for (let i = 0; i < input.length; i++){
	let symb = input[i];

    if (symb == ' '){
        continue;
    }
	else if (priority(symb) == 0){
		output += symb;
    }
	else if (symb == '('){
		stack.push('(');
    }
	else if (symb == ')'){
		while (stack[stack.length - 1] != '(')
			output += stack.pop();
		stack.pop();
	}
	else {
		while (priority(symb) <= priority(stack[stack.length - 1]))
			output += stack.pop();
		stack.push(symb);
	}
}

stack_len = stack.length;
if (stack_len > 0){
	for (i = 0; i < stack_len; i++){
		output += stack.pop();
	}
}

console.log('Output expression: ', output)
