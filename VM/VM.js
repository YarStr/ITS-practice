const fs = require('fs');
let arg = process.argv;
const readsync = require('readline-sync');

let RAM = new Array();
let ip = 0;
let flag = true;

let inputCode = fs.readFileSync(arg[2]).toString();
RAM = inputCode.split(/\s+/);

while (flag){
    switch(RAM[ip]){

        case 'input':
            let number = readsync.question('Enter number: ')
            RAM[RAM[ip+1]] = parseFloat(number);
            ip += 2;
            break;

        case 'set':
            RAM[RAM[ip+1]] = parseFloat(RAM[ip+2]);
            ip += 3;
            break;

        case 'print':
            console.log(RAM[RAM[ip+1]]);
            ip += 2;
            break;

        case 'exit':
            flag = false;
            break;

        case 'add':
            RAM[RAM[ip+3]] = RAM[RAM[ip+1]] + RAM[RAM[ip+2]]
            ip += 4;
            break;

        case 'sub':
            RAM[RAM[ip+3]] = RAM[RAM[ip+1]] - RAM[RAM[ip+2]]
            ip += 4;
            break;

        case 'mul':
            RAM[RAM[ip+3]] = RAM[RAM[ip+1]] * RAM[RAM[ip+2]]
            ip += 4;
            break;
        
        case 'cmp':
            if (RAM[RAM[ip+1]] == RAM[RAM[ip+2]])
                
                RAM[RAM[ip+3]] = 0;
            else
                RAM[RAM[ip+3]] = 1;
            ip += 4;
            break;

        case 'cmpm':
            if (RAM[RAM[ip+1]] > RAM[RAM[ip+2]])
                RAM[RAM[ip+3]] = 0;
            else
                RAM[RAM[ip+3]] = 1;
            ip += 4;
            break;
         
        case 'jmp':
            ip = parseFloat(RAM[ip+1]);
            break;

        case 'jz':
            if (RAM[RAM[ip+1]] == 0)
                ip = parseFloat(RAM[ip+2]);
            else
                ip += 3;
            break;

        case 'jnz':
            if (RAM[RAM[ip+1]] != 0)
                ip = parseFloat(RAM[ip+2]);
            else
                ip += 3;
            break;
        
        default:
            console.log('Syntax error!');
            flag = false;
    }
}