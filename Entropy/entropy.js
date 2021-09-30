let fs = require('fs');
let arg = process.argv;
let inputData;
let i = 0, n = 1;

let entropy = 0;
let alphabet = new Array();
let alphabetPower = 0;

inputData = fs.readFileSync(arg[2]);
inputData = inputData.toString();

function getBaseLog(x, y) {
	return Math.log(y) / Math.log(x);
}

for (i=0 ; i < inputData.length; i++){
	alphabet[inputData.charAt(i)] = 0
}

for (i=0 ; i < inputData.length; i++){
	alphabet[inputData.charAt(i)]++;
}

for (i in alphabet){
    alphabet[i] /= inputData.length;
	alphabetPower++
}

if (alphabetPower > 1) {
	for (i in alphabet){
		entropy += (-1) * (alphabet[i]) * getBaseLog(alphabetPower, (alphabet[i]))
		i++
	}
}

console.log('Энтропия равна:', entropy)