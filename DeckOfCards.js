//return link for a specific card
function getCardImageLink(suite, value){

    return ("PlayingCards/" + suite + value + ".png");
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
    {suite: "s", value: "A"},
    {suite: "s", value: "2"},
    {suite: "s", value: "3"},
    {suite: "s", value: "4"},
    {suite: "s", value: "5"},
    {suite: "s", value: "6"},
    {suite: "s", value: "7"},
    {suite: "s", value: "8"},
    {suite: "s", value: "9"},
    {suite: "s", value: "10"},
    {suite: "s", value: "J"},
    {suite: "s", value: "Q"},
    {suite: "s", value: "K"},
];

//shuffle deck
const deckShuffled = shuffleDeck(deckUnshuffled);

var playerFirstCard = deckShuffled[1];

var DealerFirstCard = deckShuffled[1];

var playerSecondCard = deckShuffled[2];

document.getElementById("playerFirstCard").src = getCardImageLink(playerFirstCard.suite, playerFirstCard.value);


const secondCard = document.getElementById("playerSecondCard");
secondCard.src = "PlayingCards/As.png";