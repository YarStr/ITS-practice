let fs = require('fs');
let arg = process.argv;

let i = 0;
let tree = new Array();
let alphabet = new Array();

//Функция создания узла дерева
function Node(letter, frequency, used, parent, code){
    this.letter = letter;
    this.frequency = frequency;
    this.used = used;
    this.parent = parent;
    this.code = code;
}

//Считывание строки из файла
inputData = fs.readFileSync(arg[2]).toString();

//Создание алфавита символов строки
for (i = 0 ; i < inputData.length; i++){
	alphabet[inputData.charAt(i)] = 0;
}


//Сопоставление символов алфавита с их частотой
for (i = 0 ; i < inputData.length; i++){
	alphabet[inputData.charAt(i)]++;
}

//Обработка случая, когда в строке встречается только один символ
let count = 0;
for (i in alphabet){
    count++;
}
if (count == 1){
    for (i in alphabet){
        console.log('Коды символов:\n', i, '0');
    }
}

//Обработка остальных случаев
else {
//Внесение символов алфавита в дерево в качестве листьев
for (i in alphabet){
    let n = new Node(i, alphabet[i], 0, null, '');
    tree.push(n);
}

//Построение дерева Хаффмана
while (tree.some(elem => elem.used == false)){
    let minIndex1, minIndex2; //Переменные для нахождения узлов с минимальной частотой
    freq = Infinity; //Переменная для нахождения минимальной частоты
        
    //Поиск первого эл-та с наименьшей частотой
    for (i in tree){        
        if ((!tree[i].used) && (tree[i].frequency <= freq)){
                minIndex1 = i;
                freq = tree[i].frequency;
            } 
    }
    tree[minIndex1].used = 1;

    //Поиск второго эл-та с наименьшей частотой
    freq = Infinity;
    for (i in tree){           
        if ((!tree[i].used) && (tree[i].frequency <= freq)){
            minIndex2 = i;
            freq = tree[i].frequency;
        } 
    }
    
    //Выход из цикла в случае, когда построение дерева дошло до корня
    if (freq == Infinity){
        break
    }

    tree[minIndex2].used = 1;
    
    //Задание родительского элемента для найденных узлов
    tree[minIndex1].parent = tree.length;
    tree[minIndex2].parent = tree.length;

    //Задание кода ветки от родительского эл-та к узлу
    tree[minIndex1].code += '0';
    tree[minIndex2].code += '1';

    //Создание родительского элемента
    n = new Node(
        tree[minIndex1].letter + tree[minIndex2].letter,
        tree[minIndex1].frequency + tree[minIndex2].frequency,
        0,
        null,
        '');    
    tree.push(n);   
}

console.log('Коды символов:')
for (i in alphabet){
    let codeOfSymb = '';
    let j = 0;
    
    while (i != tree[j].letter){
        j += 1;
    }
    
    do {
        codeOfSymb = tree[j].code + codeOfSymb;
        j = tree[j].parent;
    } while ((tree[j].parent != null))

    console.log(i, codeOfSymb)
}
}
