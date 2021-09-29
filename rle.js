let fs = require('fs');
let arg = process.argv;
let inText;
let i = 0, n = 1;
let out = "";
let ln;

//Блок программы, отвечающий за кодирование
if (arg[2] == 'code') {
	fs.readFile(arg[3], (err, data) => {
		if (err){
			console.error(err);
			return;
		}

		inText = data.toString();

		//Реализация алгоритма сжатия файла
		while (i < inText.length){
			while(inText.charAt(i) == inText.charAt(i+n)){
				n++;
			}

			//Разбиение длинных строк на несколько частей и их запись
			ln = n
			if (inText.charAt(i) == '#'){
				while (ln > 255){
					out += '#' + String.fromCharCode(255) + inText.charAt(i)
					ln -= 255
				}
				out += '#' + String.fromCharCode(ln) + inText.charAt(i)
			}

			//Кодирование и запись коротких строк
			else {
				if (n >= 4) {
					while (ln > 259){
						out += '#' + String.fromCharCode(259-4) + inText.charAt(i)
						ln -= 259
					}

					if (ln >= 4) {
						out += '#' + String.fromCharCode(ln-4) + inText.charAt(i)
					}
					else {
						out += inText.charAt(i).repeat(ln)
					}
				}
				else {
					out += inText.charAt(i).repeat(n)
				}
			}

			i += n;
			n = 1;
		}

		//Запись цепочки символов в файл
		fs.writeFile(arg[4], out, (err) => {
			if (err){
				console.error(err);
				return;
			}
			
			//Подсчёт коэффициента сжатия
			sizeInput = fs.statSync('input.txt');
			sizeCode = fs.statSync('code.txt');
			console.log('Файл сжат. Коэффициент сжатия: ', sizeInput.size / sizeCode.size);
		});	
	});
}

//Блок программы, отвечающий за декодирование
else if (arg[2] == 'decode'){
	fs.readFile('code.txt', (err, data) => {
		if (err){
			console.error(err);
			return;
		}
		
		inText = data.toString();

		//Реализация алгоритма декодирования
		while (i < inText.length){
			if (inText.charAt(i) == '#'){
				if (inText.charAt(i+2) == '#') {
					codeSymb = 0
				}
				else {
					codeSymb = 4
				}

				out += inText.charAt(i+2).repeat(inText.charCodeAt(i+1) + codeSymb)	
				i += 3;
			}
			else {
				out += inText.charAt(i)
				i += 1;
			}
		}

		//Запись цепочки символов в файл
		fs.writeFile(arg[4], out, (err) => {
			if (err){
				console.error(err);
				return;
			}
		});	
	});
}

else console.log('Ошибка при вводе данных');