// Start Screen
const introStartBtn = document.getElementById('introStartBtn')
const introScreen = document.getElementById('introScreen')
// Character Creation
const characterCreationScreen = document.getElementById('characterCreationScreen')
const generateCharacterBtn = document.getElementById('generateCharacterBtn')
const characterNameInput = document.getElementById('characterNameInput')
const characterInfoList = document.getElementById('characterInfoList')
const characterConfirmBtn = document.getElementById('characterConfirmBtn')
// Game Area
const gameAreaDisplay = document.getElementById('gameAreaDisplay')
const exploreActionBtn = document.getElementById('exploreActionBtn')
const gameLog = document.getElementById('gameLog')

// game Characters
let character
let monster


// Template For Character
class Character {
    constructor(name) {
        this.name = name
        this.hp = Math.floor(Math.random() * 201)
        this.attack = Math.floor(Math.random() * 51)
        this.actionMode = 'safe'
    }
    // this prevents the player using certain actions while attacking
    changeActionMode() {
        if(this.actionMode = 'safe') {
            this.actionMode = 'attack'
        } else {
            this.actionMode = 'safe'
        }
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





// Intro Screen Events
        // introStartBtn.addEventListener('click', () => {
        //     introScreen.style.display = 'none'
        //     characterCreationScreen.style.display = 'block'
        // })

        // Auto Start for testing
introStartBtn.addEventListener('click', autoStart())

function autoStart() {
    introScreen.style.display = 'none'
    characterCreationScreen.style.display = 'block'
}



// Character Creation Events 
generateCharacterBtn.addEventListener('click', () => {
    let name = characterNameInput.value ? characterNameInput.value : 'Unknown'

    character = new Character(name)


    displayCharacterInfoList(character)

})

        //check if character was created before comfirming the switch the gameLog
characterConfirmBtn.addEventListener('click', () => {
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


// Main Area events
exploreActionBtn.addEventListener('click', () => {
    if(character.actionMode === 'safe'){
        generatePlayerEncounter()
    } else {
        console.log('nothing')
    }
})


// Character Creation Functions
function displayCharacterInfoList(character) {
    if(characterInfoList.childElementCount === 0) {
        createLiforCharacterList()
    } else {
        while (characterInfoList.firstChild) {
            characterInfoList.removeChild(characterInfoList.firstChild);
        }
        createLiforCharacterList()
    }
}

function createLiforCharacterList(params) {
    let name = document.createElement('li')
    let hp = document.createElement('li')
    let attack = document.createElement('li')
    
    name.innerText = `Name: ${character.name}`
    hp.innerText = `HP: ${character.hp}`
    attack.innerText = `Attack: ${character.attack}`

    characterInfoList.append(name)
    characterInfoList.append(hp)
    characterInfoList.append(attack)
}


// Main game area functions
function generatePlayerEncounter() {
    const encounters = ['Monster', 'Nothing']
    const choosenEncounter = encounters[Math.floor(Math.random() * encounters.length)] 
    
    if(choosenEncounter === 'Monster') {
        character.changeActionMode()
        
    } else if(choosenEncounter === 'Nothing') {
        console.log('inside nothing')
    }
}

