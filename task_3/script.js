const readlineSync = require('readline-sync');

/**
 * @name checkWin
 * @description Функция проверяющая выигрыш.
 * @param {string} valueRobot
 * @param {string} valueHuman
 * @param {number} countOfValue
 * @returns {object} countOfCow, countOfBulls, valuesCow, valuesBulls
 */
function checkWin(valueRobot, valueHuman, countOfValue) {
    let valuesCow = []
    let valuesBulls = []
    let countOfCow = 0 // Цифры совпадают и на своих местах
    let countOfBulls = 0 // Такая цифра есть в числе, но не на своем месте
    for(let i = 0; i < countOfValue; i++) {
        if(valueRobot[i] === valueHuman[i]) {
            countOfCow++
            valuesCow.push(valueHuman[i])
        }
        else {
            let valueRobot1 = valueRobot
            valueRobot1[i] = "*"
            if(valueRobot1.includes(valueHuman[i]))
            {
                countOfBulls++
                valuesBulls.push(valueHuman[i])
            }
        }
    }
    return [countOfCow, countOfBulls, valuesCow, valuesBulls]
}

/**
 * @name getValueRobot
 * @description Получение числа робота.
 * @param {number} countOfValue
 * @returns {string} valueRobot
 */
function getValueRobot(countOfValue) {
    let valueRobot = ""
    for(let i = 0; i < countOfValue; i++) {
        valueRobot += Math.floor((Math.random() * 9) + 1)
    }
    return valueRobot
}

console.log('Введите количество цифр в числе: ')
let countOfValue = +readlineSync.question(); // Количество цифр в числе
console.log('Введите количество попыток(Бесконечно = 0): ')
let countOfTry = +readlineSync.question() // Количество попыток
let valueRobot = getValueRobot(countOfValue) // Получение числа робота

if (countOfTry < 0 || countOfTry === 0) countOfTry = true;

while(countOfTry) {
    if(countOfTry !== true) countOfTry--

    console.log('Введите число: ')
    let valueHuman = readlineSync.question() // Вводим свое число
    let [countOfCow, countOfBulls, valuesCow, valuesBulls] = checkWin(valueRobot, valueHuman, countOfValue)

    if(countOfCow === countOfValue){ // Проверяем выигрыш
        console.log(`Вы выиграли, номер - ${valueRobot}`)
        countOfTry = false
    } else { // Иначе показываем количество быков и коров
        console.log(`Совпадающие числа не на своих местах - ${countOfBulls}(${valuesBulls}),
         Числа на своих местах - ${countOfCow}(${valuesCow})`)
    }
}