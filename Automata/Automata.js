let fs = require('fs');
let arg = process.argv;

let string;
let substring;

string = (fs.readFileSync(arg[2])).toString();
substring = arg[3];

len_str = string.length;
len_substr = substring.length;
alph = new Array();
alphabet = new Array();

//Определяем алфавит строки substring
for (i = 0; i < len_substr; i++){
    alph[substring.charAt(i)] = 0;
    alphabet[i] = substring.charAt(i);
}

//В двумерном массиве del храним таблицу переходов
del = new Array(len_substr + 1)
for (j = 0; j <= len_substr; j++){
    del[j] = new Array();
}

//Инициализируем таблицу переходов
for (i in alph){
    del[0][i] = 0;
}

//Формируем таблицу переходов
for (j = 0; j < len_substr; j++){
    prev = del[j][substring.charAt(j)]
    del[j][substring.charAt(j)] = j+1
    for(i in alph){
        del[j+1][i] = del[prev][i]
    }
}

//Выводим таблицу переходов
console.log('\nТаблица переходов:');
for (j = 0; j <= len_substr; j++) {
    out = '';
    for (i in alph){
        out += del[j][i] + ' ';
    }
    console.log(j, out);
}

state = 0;
result = new Array();
for (let i = 0; i < len_str; i++){
    if (alphabet.indexOf(string.charAt(i)) != -1){
        state = del[state][string.charAt(i)];
        if (state == len_substr){
            result.push(i - len_substr + 1); 
        }
    }
    else state = 0;
}

console.log('\nВхождения в исходную строку подстроки "' + substring + '":', result);

