// Start Screen
const introStartBtn = document.getElementById('introStartBtn')
// player Creation
const generatePlayerBtn = document.getElementById('generatePlayerBtn')
const playerConfirmBtn = document.getElementById('playerConfirmBtn')
// Game Area
const exploreActionBtn = document.getElementById('exploreActionBtn')
const attackActionBtn = document.getElementById('attackActionBtn')
const gameLog = document.getElementById('gameLog')


// game players
let player
let monster


// Template For player
class Player {
    constructor(name) {
        this.name = name
        this.hp = 1 //Math.floor(Math.random() * 25)
        this.attackMode = false
        this.lastAction  
    }

    changeToAttackMode() {
        this.attackMode = true
        console.log('changed to attack mode',this.attackMode)
    }
    disableAttackMode() {
        this.attackMode = false
        console.log('changed to attack mode ',this.attackMode)
    }

    setLastAction(attackedOrDefended) {
        if(attackedOrDefended === 'attacked') {
            this.lastAction = 'attacked'
        } else {
            this.lastAction = 'defended'
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

class Monster extends Player {
    constructor() {
        super()
        this.name = this.generateMonsterRace()
        this.attackMode = true
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
    const playerCreationScreen = document.getElementById('playerCreationScreen')

    introScreen.style.display = 'none'
    playerCreationScreen.style.display = 'block'
}


// player CREATION EVENTS AND FUNCTIONS
generatePlayerBtn.addEventListener('click', () => {
    const playerNameInput = document.getElementById('playerNameInput')
    let name = playerNameInput.value ? playerNameInput.value : 'Unknown'

    player = new Player(name)


    displayPlayerInfoList()

})

        //check if player was created before comfirming the switch the gameLog
playerConfirmBtn.addEventListener('click', () => {
    const gameAreaDisplay = document.getElementById('gameAreaDisplay')
    if(player === undefined) {
        if(playerCreationScreen.lastChild.nodeName !== "P") {
            let errorMessage = document.createElement('p')
            errorMessage.innerText = 'Please Generate Stats'
            playerCreationScreen.append(errorMessage)
        }
    } else {
        playerCreationScreen.style.display = 'none'
        gameAreaDisplay.style.display = 'block'
    }
})


function displayPlayerInfoList() {
    const playerInfoList = document.getElementById('playerInfoList')
    if(playerInfoList.childElementCount === 0) {
        createLiforPlayerList()
    } else {
        while (playerInfoList.firstChild) {
            playerInfoList.removeChild(playerInfoList.firstChild);
        }
        createLiforPlayerList()
    }
}

function createLiforPlayerList() {
    let name = document.createElement('li')
    let hp = document.createElement('li')

    
    name.innerText = `Name: ${player.name}`
    hp.innerText = `HP: ${player.hp}`
    

    playerInfoList.append(name)
    playerInfoList.append(hp)

}

// MAIN GAME AREA EVENTS AND FUNCTIONS  
exploreActionBtn.addEventListener('click', () => {
    if(!player.attackMode) {
        initiateEncounter(generatePlayerEncounter())
    } else {
        createGameLog('this action is disabled')
    }
})
// not active yet
attackActionBtn.addEventListener('click', () => {
    
})

function generatePlayerEncounter() {
    let encounter = ['monster', 'nothing']
    let chosenEncounter = encounter[Math.floor(Math.random()*encounter.length)]
    return chosenEncounter
}

// Main game run
function initiateEncounter(generatePlayerEncounter) {
    let chosenEncounter = generatePlayerEncounter

    if(chosenEncounter === 'monster') {
        // changes to attack mode
        createGameLog('you encounter a monster')
        player.changeToAttackMode()
        createGameLog('player changes to attack Mode')
        generateMonster()
        determineFirstAttacker()

    } else if(chosenEncounter === 'nothing') {
        createGameLog('You find nothing')
    }

}

function generateMonster() {
    monster = new Monster()
    console.log('mob created')
}

// Chnage this latter to test player actions 
function determineFirstAttacker() {
    let randomChance = Math.random() 
    // mob attacks first if randomChance > .5
    if(true) {
        createGameLog('monster attacks first')
        monsterAttacks()
        // monster attacks
    } else {
        createGameLog('player goes first')
    }
}

function monsterAttacks() {
    let totalDamage
    let monsterAttack = monster.attack()
    let playerDefense = player.defend()
    console.log('mob',monsterAttack)
    console.log('playerD',playerDefense)

    if(monsterAttack < playerDefense) {
        createGameLog('The monster could not overcome you defense: zero damage')
    } else {
        totalDamage = monsterAttack - playerDefense
        createGameLog(`The monster attacked for ${totalDamage} damage`)
    }
    attemptDoubleAttack()


    monster.setLastAction('attacked')
    player.setLastAction('defended')
    console.log(monster.lastAction)
}

function attemptDoubleAttack() {
    let attackChance = Math.random()
    console.log(attackChance)
    if(attackChance < .10) {
        console.log('this is a double attack', attackChance)
        monsterAttacks()
    }
}

function continueBattle() {
    
}

function checkIfPlayerAlive() {
    if(player.hp > 0) {
        createGameLog('player survives attack')
    } else {
        createGameLog('player has died')
    }
}

function createGameLog(logText) {
    const gameLog = document.getElementById('gameLog')
    let log = document.createElement('li')
    log.innerText = logText
    gameLog.append(log)
}








