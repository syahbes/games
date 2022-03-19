//change all alert to inject... - Done
//change all alert to 4- lines that scorll ?

const cardArray = [ 
    { name: 'fries', img: 'images/fries.png', },
    { name: 'cheeseburger', img: 'images/cheeseburger.png', },
    { name: 'hotdog', img: 'images/hotdog.png', },
    { name: 'ice-cream', img: 'images/ice-cream.png', },
    { name: 'milkshake', img: 'images/milkshake.png', },  
    { name: 'pizza', img: 'images/pizza.png', }, 
    { name: 'fries', img: 'images/fries.png', },
    { name: 'cheeseburger', img: 'images/cheeseburger.png', },
    { name: 'hotdog', img: 'images/hotdog.png', }, 
    { name: 'ice-cream', img: 'images/ice-cream.png', }, 
    { name: 'milkshake', img: 'images/milkshake.png', },
    { name: 'pizza', img: 'images/pizza.png', }
]

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
const lineDisplay = document.querySelector('#lineDisplay');

let cardChosen = [];
let cardChosenIds = [];
const cardsWon = [];

function creatBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src','images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(card);
    }
}

creatBoard();

function checkMatch() {
    //if using more img use : document.querySelectorAll('#grid img')
    const cards = document.querySelectorAll('img');
    const optionOneId = cardChosenIds[0];
    const optionTwoId = cardChosenIds[1];
    if (optionOneId == optionTwoId) { 
        lineDisplay.textContent = 'You clicked the same card!';
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        // alert('You clicked the same card!'); 
    }
    //console.log(cards);
    //console.log('check for match!');
    else if (cardChosen[0] == cardChosen[1]) {
        //alert('You found a match!');
        lineDisplay.textContent = 'You found a match!';
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        //stop listeing
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardChosen);
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        lineDisplay.textContent = 'Not a match, try again';
        //alert('Sorry try again!');
    }
    resultDisplay.innerHTML = cardsWon.length;

    cardChosen = [];
    cardChosenIds = [];

    if (cardsWon.length == cardArray.length/2) {
        resultDisplay.textContent = 'Congrats you found all';
      }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name);
    cardChosenIds.push(cardId);
    this.setAttribute('src', cardArray[cardId].img )
    if (cardChosen.length === 2) {
        setTimeout( checkMatch, 500);
    }
}
