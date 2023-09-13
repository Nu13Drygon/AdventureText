// Start Screen
const introStartBtn = document.getElementById('introStartBtn')
// Character Creation
const generateCharacterBtn = document.getElementById('generateCharacterBtn')
const characterConfirmBtn = document.getElementById('characterConfirmBtn')
// Game Area
const exploreActionBtn = document.getElementById('exploreActionBtn')
const attackActionBtn = document.getElementById('attackActionBtn')
const gameLog = document.getElementById('gameLog')


// game Characters
let character
let monster


// Template For Character
class Character {
    constructor(name) {
        this.name = name
        this.hp = Math.floor(Math.random() * 25)
        this.actionMode = 'safe'
    }
    // this prevents the player using certain actions while attacking
    changeActionMode() {
        if(this.actionMode === 'safe') {
            this.actionMode = 'danger'
        } else {
            this.actionMode = 'safe'
        }
    }

    rollDice() {
        return Math.floor(Math.random() * 21)
    }
    attack() {
        return Math.floor(Math.random() * 13)
    }
    defend() {
        return Math.floor(Math.random() * 13)
    }
}

class Monster extends Character {
    constructor() {
        super()
        this.name = this.generateMonsterRace()
    }
    generateMonsterRace() {
        const listOfMonster = ['Orc', 'Goblin', 'Slime']
        return listOfMonster[Math.floor(Math.random() * listOfMonster.length)]
    }
}




// INTRO SCREEN EVENTS AND FUNCTIONS

introStartBtn.addEventListener('click', autoStart())


function autoStart() {
    const introScreen = document.getElementById('introScreen')
    const characterCreationScreen = document.getElementById('characterCreationScreen')

    introScreen.style.display = 'none'
    characterCreationScreen.style.display = 'block'
}


// CHARACTER CREATION EVENTS AND FUNCTIONS
generateCharacterBtn.addEventListener('click', () => {
    const characterNameInput = document.getElementById('characterNameInput')
    let name = characterNameInput.value ? characterNameInput.value : 'Unknown'

    character = new Character(name)


    displayCharacterInfoList()

})

        //check if character was created before comfirming the switch the gameLog
characterConfirmBtn.addEventListener('click', () => {
    const gameAreaDisplay = document.getElementById('gameAreaDisplay')
    if(character === undefined) {
        if(characterCreationScreen.lastChild.nodeName !== "P") {
            let errorMessage = document.createElement('p')
            errorMessage.innerText = 'Please Generate Stats'
            characterCreationScreen.append(errorMessage)
        }
    } else {
        characterCreationScreen.style.display = 'none'
        gameAreaDisplay.style.display = 'block'
    }
})


function displayCharacterInfoList(character) {
    const characterInfoList = document.getElementById('characterInfoList')
    if(characterInfoList.childElementCount === 0) {
        createLiforCharacterList()
    } else {
        while (characterInfoList.firstChild) {
            characterInfoList.removeChild(characterInfoList.firstChild);
        }
        createLiforCharacterList()
    }
}

function createLiforCharacterList() {
    let name = document.createElement('li')
    let hp = document.createElement('li')

    
    name.innerText = `Name: ${character.name}`
    hp.innerText = `HP: ${character.hp}`
    

    characterInfoList.append(name)
    characterInfoList.append(hp)

}

// MAIN GAME AREA EVENTS AND FUNCTIONS  
exploreActionBtn.addEventListener('click', () => {
    if(character.actionMode === 'safe'){
        generatePlayerEncounter()
    } else {
        console.log('you can not explore during battle')
    }
})
// not active yet
attackActionBtn.addEventListener('click', () => {
    if(character.actionMode === 'danger') {
        calculateBattleDamage('character')
    }
})



function generatePlayerEncounter() {
    const encounters = ['Monster', 'Nothing']
    const choosenEncounter = encounters[Math.floor(Math.random() * encounters.length)] 
    
    if(choosenEncounter === 'Monster') {
        character.changeActionMode()
        createGameLog('You encounter a monster')
        createMonster()
        initiateBattle()
        
    } else if(choosenEncounter === 'Nothing') {
        createGameLog("You explore and find nothing")
    }
}

function createGameLog(logText) {
    const gameLog = document.getElementById('gameLog')
    let log = document.createElement('li')
    log.innerText = logText
    gameLog.append(log)
}

function createMonster() {
    monster = new Monster
    createGameLog(`A ${monster.name} appears!`)
}

function initiateBattle() {
    if(character.hp > 0) {
        let characterRoll = character.rollDice()
        let monsterRoll = monster.rollDice()
    
        if(characterRoll > monsterRoll) {
            createGameLog("Player Turn Choose a Action")
        } else if(characterRoll < monsterRoll) {
            createGameLog('Monster Attacks')
            calculateBattleDamage('monster')
        } else if(characterRoll === monsterRoll) {
            createGameLog('You and the monster are at a standoff')
            initiateBattle()
        }
    }
}

// if player health is above zero, calculate damage, log it, check player health, then initiate battle again
function calculateBattleDamage(characterOrMonster) {
    if(character.hp > 0 && monster.hp > 0) {
        if(characterOrMonster === 'monster') {
            let monsterDamage = monster.attack()
            let characterDefense = character.defend()
    
            if(monsterDamage <= characterDefense) {
                createGameLog(`character defends ${characterDefense} against ${monsterDamage} damage`)
                createGameLog(`Character suffers zero damage`)
            } else {
                let totalDamage = monsterDamage - characterDefense
                character.hp = character.hp - totalDamage
                createGameLog(`character suffers ${totalDamage} damage, loses HP`)
                checkCharacterDeath()
            }

        } else if(characterOrMonster === 'character') {
            let characterDamage = character.attack()
            let monsterDefense = monster.defend()
            
            if(characterDamage <= monsterDefense) {
                createGameLog(`monster defends ${monsterDefense} against ${characterDamage} damage`)
                createGameLog(`Character suffers zero damage`)
            } else {
                let totalDamage = characterDamage - monsterDefense
                monster.hp = monster.hp - totalDamage
                createGameLog(`monster suffers ${totalDamage} damage, loses HP`)
                checkCharacterDeath()
            }

        }
        initiateBattle()
    }
}


function checkCharacterDeath() {
    const characterControls = document.getElementById('characterControls')
    if(character.hp <= 0) {
        characterControls.style.display = 'none'
        createGameLog('You died')
    }
    if(monster.hp <= 0) {
        createGameLog('monster died')
        character.changeActionMode()
    }
}