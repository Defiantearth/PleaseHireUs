//return link for a specific card
function getCardImageLink(suite, value){

    return ("PlayingCards/" + value + suite + ".png");
    }

//shuffle the deck of cards
function shuffleDeck(deck){
    let currentIndex = deck.length;

    //while there are elements to shuffle still
    while(currentIndex != 0){
         
        //pick a remaning element
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        //swap it with the current element
        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
}


    //a list of objects. the list is the deck and each object is a card.
const deckUnshuffled = [
    {suite: "s", value: "A"},{suite: "c", value: "A"},{suite: "h", value: "A"},{suite: "d", value: "A"},
    {suite: "s", value: "2"},{suite: "c", value: "2"},{suite: "h", value: "2"},{suite: "d", value: "2"},
    {suite: "s", value: "3"},{suite: "c", value: "3"},{suite: "h", value: "3"},{suite: "d", value: "3"},
    {suite: "s", value: "4"},{suite: "c", value: "4"},{suite: "h", value: "4"},{suite: "d", value: "4"},
    {suite: "s", value: "5"},{suite: "c", value: "5"},{suite: "h", value: "5"},{suite: "d", value: "5"},
    {suite: "s", value: "6"},{suite: "c", value: "6"},{suite: "h", value: "6"},{suite: "d", value: "6"},
    {suite: "s", value: "7"},{suite: "c", value: "7"},{suite: "h", value: "7"},{suite: "d", value: "7"},
    {suite: "s", value: "8"},{suite: "c", value: "8"},{suite: "h", value: "8"},{suite: "d", value: "8"},
    {suite: "s", value: "9"},{suite: "c", value: "9"},{suite: "h", value: "9"},{suite: "d", value: "9"},
    {suite: "s", value: "10"},{suite: "c", value: "10"},{suite: "h", value: "10"},{suite: "d", value: "10"},
    {suite: "s", value: "J"},{suite: "c", value: "J"},{suite: "h", value: "J"},{suite: "d", value: "J"},
    {suite: "s", value: "Q"},{suite: "c", value: "Q"},{suite: "h", value: "Q"},{suite: "d", value: "Q"},
    {suite: "s", value: "K"},{suite: "c", value: "K"},{suite: "h", value: "K"},{suite: "d", value: "K"}
];

//shuffle deck
const deckShuffled = deckUnshuffled
shuffleDeck(deckShuffled);

console.log(deckShuffled[0].suite);

//get starting cards
const playerFirstCard = deckShuffled[0];
const dealerFirstCard = deckShuffled[1];
const playerSecondCard = deckShuffled[2];

console.log(getCardImageLink(playerFirstCard.suite, playerFirstCard.value))

//show starting cards
document.getElementById("playerFirstCard").src = getCardImageLink(playerFirstCard.suite, playerFirstCard.value);
document.getElementById("dealerFirstCard").src = getCardImageLink(dealerFirstCard.suite, dealerFirstCard.value);
document.getElementById("playerSecondCard").src = getCardImageLink(playerSecondCard.suite, playerSecondCard.value);

//const secondCard = document.getElementById("playerSecondCard");
//secondCard.src = "PlayingCards/As.png";