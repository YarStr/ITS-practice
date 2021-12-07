function isNumber(number){
    number = "" + number;
    return !isNaN(number) && !isNaN(parseFloat(number));
}

function isNegative(number){
    if (number[0] == '-'){
        return true;
    }
    return false;
}

function toNormalisedNumber(number, signBit){
    let mantissa = '';
    let order;

    number = number.toString(2);

    if (number.indexOf('.') == -1){
        number += '.';
    }

    //console.log('Число без знака:', number)

    order = number.indexOf('.') - number.indexOf('1') - 1;
    //console.log(number.length);
    if (order >= 0){
        number = number.slice(number.indexOf('1'), number.indexOf('.')) + number.slice(number.indexOf('.') + 1);
    }
    else {
        ++order;
        number = number.slice(number.indexOf('1'));
    }

    if (number.length > 24){
        number = number.slice(0, 24);
    }
    else {
        number += '0'.repeat(24 - number.length);
    }
    //console.log('Order:', order)
    
    mantissa = number.slice(1);
    
    order = (order + 127).toString(2);
    order = '0'.repeat(8 - order.length) + order;
    
    return [signBit, order, mantissa];
}

function main(input){
    let signBit = '0';

    //Число является ничем
    if (isNumber(input)){
        //Проверка знака
        if (isNegative(input)){
            signBit = '1';
            input  = input.slice(1);
        }
        
        number = parseFloat(input);

        //Число больше допустимого по модулю
        if (number > (2 - Math.pow(2, -23)) * Math.pow(2, 127)){
            return [signBit, '1'.repeat(8), '0'.repeat(23)];
        }
        //Число меньше допустимого по модулю или является нулём
        else if (number < Math.pow(2, -126) || number == 0){
            return [signBit, '0'.repeat(8), '0'.repeat(23)];
        }
        //Если всё нормально, переводим число по классике
        else {
            return toNormalisedNumber(number, signBit);
        }
    }
    
    return [signBit, '1'.repeat(8), '1' + '0'.repeat(22)]
}

