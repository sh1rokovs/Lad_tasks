const readlineSync = require('readline-sync');

// Описание монстра
const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}

// Описание героя
const hero = {
    maxHealth: 10,
    name: "Евстафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
}

// Умения в кулдауне
let cooldownSkills = []

/**
 * @name setHealth
 * @description Задаем здоровье Герою.
 * @param {string} difficult
 */
function setHealth(difficult) {
    if (difficult === "1") hero.maxHealth = 20
    if (difficult === "2") hero.maxHealth = 15
    if (difficult === "3") hero.maxHealth = 10
}

// cooldown functions
/**
 * @name isCooldown
 * @description Проверка перезарядки умения.
 * @param {object} skill
 */
function isCooldown(skill) {
    if (cooldownSkills.length === 0) return false
    for (let elem of cooldownSkills) {
        if (skill.name === elem[0]) return true
    }
    return false
}

/**
 * @name addCooldown
 * @description Дабавление умения в перезарядку.
 * @param {object} skill
 */
function addCooldown(skill) {
    if (skill.cooldown !== 0) cooldownSkills.push([skill.name, skill.cooldown])
}

/**
 * @name subCooldown
 * @description Декремент перезарядки умений.
 */
function subCooldown() {
    for (let skill of cooldownSkills) {
        if (skill[1] === 0) {
            cooldownSkills.splice(cooldownSkills.indexOf(skill), 1)
        } else {
            skill[1]--
        }
    }
}

// moves functions
/**
 * @name monsterGetMoves
 * @description Получение умения монстра для хода.
 * @return Object
 */
function monsterGetMoves() {
    let move = Math.floor((Math.random() * monster.moves.length))
    while (true) {
        if (isCooldown(monster.moves[move])) {
            continue
        } else {
            return monster.moves[move]
        }
    }
}

/**
 * @name heroGetMoves
 * @description Получение умения монстра для хода.
 * @param {number} move
 * @return Object
 */
function heroGetMoves(move) {
    if (move <= hero.moves.length && move >= 1) {
        for (let skill of cooldownSkills) {
            if (skill[0] === hero.moves[move - 1].name){
                return false
            }
        }
        return hero.moves[move - 1]
    }
}

/**
 * @name heroGetMoves
 * @description Ход персонажей, подсчитывается урон.
 * @param {Object} monsterSkill
 * @param {Object} heroSkill
 * @param {number} monsterHealth
 * @param {number} heroHealth
 * @return number[monsterHealth, heroHealth]
 */
function battleMoves(monsterSkill, heroSkill, monsterHealth, heroHealth) {
    monsterHealth = monsterHealth - ((heroSkill.physicalDmg - heroSkill.physicalDmg *
            (monsterSkill.physicArmorPercents / 100))  +
            heroSkill.magicDmg -
            (heroSkill.magicDmg *
            (monsterSkill.physicArmorPercents / 100)))

    heroHealth = heroHealth - ((monsterSkill.physicalDmg - monsterSkill.physicalDmg *
            (heroSkill.physicArmorPercents / 100))  +
        monsterSkill.magicDmg -
        (monsterSkill.magicDmg *
            (heroSkill.physicArmorPercents / 100)))

    addCooldown(heroSkill)
    addCooldown(monsterSkill)

    return [Math.floor(monsterHealth), Math.floor(heroHealth)]
}

/**
 * @name heroGetMoves
 * @description Формирование строки с умениями.
 * @param {Object} character
 * @return String
 */
function getSkills(character){
    let skillsNames = ''
    for (let i = 0; i < character.moves.length; i++) {
        skillsNames += `${i + 1}.${character.moves[i].name}, `+
        `фУрон ${character.moves[i].physicalDmg}, `+
        `мУрон ${character.moves[i].magicDmg}, `+
        `фБроня ${character.moves[i].physicArmorPercents} %, `+
        `мБроня ${character.moves[i].magicArmorPercents} %, `+
        `кд ${character.moves[i].cooldown}, `
        if (isCooldown(character.moves[i])) {
            skillsNames += ` in cooldown\n`
        } else {
            skillsNames += `\n`
        }
    }
    return skillsNames
}

console.log('Сложность:\n' +
    '1. Низкая (20 HP)\n' +
    '2. Средняя (15 HP)\n' +
    '3. Высокая (10 HP)\n')
setHealth(readlineSync.question())

let monsterHealth = monster.maxHealth
let heroHealth = hero.maxHealth

while (true) {
    let monsterMovesNames = getSkills(monster)
    let heroMovesNames = getSkills(hero)

    subCooldown()

    if (monsterHealth === 0 && 0 === heroHealth) { console.log('Ничья!'); break; }
    if (monsterHealth === 0 && 0 !== heroHealth) { console.log('Монстр умер!'); break; }
    if (monsterHealth !== 0 && 0 === heroHealth) { console.log('Герой погиб!'); break; }

    console.log(`----------------- battle -----------------\n`+
        `Monster:${monster.name}, Hero:${hero.name}\n`+
        `Health:${monsterHealth}, Health:${heroHealth}\n`+
        `Monster skills:\n${monsterMovesNames}`+
        `------------------------------------------\n`+
        `Выберите умение:\n${heroMovesNames}`)

    let heroMove = heroGetMoves(+readlineSync.question())
    let monsterMove = monsterGetMoves()

    console.log(`Монстр использует умение: ${monsterMove.name}\nГерой использует умение: ${heroMove.name}`)

    let health = battleMoves(monsterMove, heroMove, monsterHealth, heroHealth)
    monsterHealth = health[0]
    heroHealth = health[1]
}
