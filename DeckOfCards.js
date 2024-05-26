//return link for a specific card
function getCardImageLink(suite, value){

    return ("PlayingCards/" + suite + value + ".png");
    }

    //a list of objects. the list is the deck and each object is a card.
const deck = [
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

//var cardIndex = 
var card = {};
card.suite = deck[1].suite;
card.value = deck[1].value;






const firstCard = document.getElementById("playerFirstCard");
firstCard.src = "PlayingCards/2s.png";

const secondCard = document.getElementById("playerSecondCard");
secondCard.src = "PlayingCards/As.png";
