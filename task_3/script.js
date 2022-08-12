const readlineSync = require('readline-sync');

let countOfValue = +readlineSync.question('Enter count of number: ');
let countOfTry = +readlineSync.question('Enter count of try(Infinity = 0): ')

function checkWin(valueRobot, valueHuman, countOfValue) { //return countOfCow, countOfBulls
    console.log(valueRobot, valueHuman, countOfValue)
    let valuesCow = []
    let valuesBulls = []
    let countOfCow = 0 // Цифры совпадают и на своих местах
    let countOfBulls = 0 // Такая цифра есть в числе, но не на своем месте
    for(let i = 0; i < countOfValue; i++) {
        if(valueRobot.toString()[i] === valueHuman.toString()[i]) {
            countOfCow++
            valuesCow.push(valueHuman.toString()[i])
        }
        else {
            let valueRobot1 = valueRobot.toString()
            valueRobot1[i] = "*"
            if(valueRobot1.includes(valueHuman.toString()[i]))
            {
                countOfBulls++
                valuesBulls.push(valueHuman.toString()[i])
            }
        }
    }
    console.log(countOfCow, countOfBulls, valuesCow, valuesBulls)
    return [countOfCow, countOfBulls, valuesCow, valuesBulls]
}

function getValueRobot(countOfValue) { //return valueRobot
    let valueRobot = ""
    for(let i = 0; i < countOfValue; i++) {
        valueRobot += Math.floor((Math.random() * 9) + 1).toString()
    }
    console.log(valueRobot)
    return valueRobot
}

if(countOfTry < 0) {
    countOfTry = 0
}
else if(countOfTry === 0){
    countOfTry = true
}

let valueRobot = getValueRobot(countOfValue)
while(countOfTry) {
    if(countOfTry !== true){
        countOfTry--
    }
    let valueHuman = +readlineSync.question('Enter number: ')
    console.log(checkWin(valueRobot, valueHuman, countOfValue))
    let [countOfCow, countOfBulls, valuesCow, valuesBulls] = checkWin(valueRobot, valueHuman, countOfValue)

    if(countOfCow === countOfValue){
        console.log(`You win, number is - ${valueRobot}`)
        countOfTry = false
    }
    else {
        console.log(`Matching numbers are out of place - ${countOfBulls}[${valuesBulls}], Numbers in place - ${countOfCow}[${valuesCow}]`)
    }
}