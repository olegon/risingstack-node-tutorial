const readline = require('readline');
const calc = require('./calc.js');

function runREPL () {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Digite números separados por espaços para somá-los: ', (answer) => {
        const numeros = answer.split(' ')
            .map(n => {
                var number = parseFloat(n);

                return isNaN(number) ? 0 : number;
            });

        console.log(`A soma desses números é: ${calc.sum(numeros)}`);

        rl.close();
    });
}

module.exports.runREPL = runREPL;
