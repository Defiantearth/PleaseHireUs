
function startGame(){
    
    //pull up the betting phase of the game.
    document.getElementById("startGameButton").remove();
    document.getElementById("startingHeader").remove();
    document.getElementById("chipList").style.visibility = "visible";
    
    //get value of starting chips
    chipTotal = 100;
    //chipTotal = document.getElementById("startingChipAmount").innerText;
    //chipTotal = parseInt(chipTotal.substring(1));
    
    chipFormat();
}

function chipFormat(){
    //display what chips the player has avalible
    document.getElementById("chipList").style.visibility = "visible";
    document.getElementById("startingChipAmount").innerText = "$" + chipTotal;
   
    //make chips visible if they have become hidden previously.
    document.getElementById("pinkChip").style.visibility = "visible";
    document.getElementById("yellowChip").style.visibility = "visible";
    document.getElementById("purpleChip").style.visibility = "visible";
    document.getElementById("blackChip").style.visibility = "visible";
    document.getElementById("greenChip").style.visibility = "visible";
    document.getElementById("redChip").style.visibility = "visible";
    document.getElementById("blueChip").style.visibility = "visible";
    
    
    
    if(chipTotal < 5000){document.getElementById("pinkChip").style.visibility = "hidden";}
         if (chipTotal < 1000){document.getElementById("yellowChip").style.visibility = "hidden";}
             if (chipTotal < 500){document.getElementById("purpleChip").style.visibility = "hidden";}
                 if (chipTotal < 100){document.getElementById("blackChip").style.visibility = "hidden";}
                     if (chipTotal < 25){document.getElementById("greenChip").style.visibility = "hidden";}
                         if (chipTotal < 5){document.getElementById("redChip").style.visibility = "hidden";}
                            if (chipTotal < 1){document.getElementById("blueChip").style.visibility = "hidden";}
    
     

    placeBets(chipTotal);
    
}

function placeBets(){
    //look for start game button to be pressed
    document.getElementById("blueChip").addEventListener("click",chipFunction);
    document.getElementById("redChip").addEventListener("click",chipFunction);
    document.getElementById("greenChip").addEventListener("click",chipFunction);
    document.getElementById("blackChip").addEventListener("click",chipFunction);
    document.getElementById("purpleChip").addEventListener("click",chipFunction);
    document.getElementById("yellowChip").addEventListener("click",chipFunction);
    document.getElementById("pinkChip").addEventListener("click",chipFunction);
    document.getElementById("PlaceBetButton").addEventListener("click",newHand);
}

function chipFunction(event){
    //figure out what chip 
    var chip = event.target.id;
    

    //add to bet for whip chip was inputed
    switch(chip){
        
        case "blueChip":
            totalBet +=1;
            chipTotal -=1;
            break;
        case "redChip":
            totalBet +=5;
            chipTotal -=5;
            break;
        case "greenChip":
            totalBet +=25;
            chipTotal -=25;
            break;
        case "blackChip":
            totalBet +=100;
            chipTotal -=100;
            break;
        case "purpleChip":
            totalBet +=500;
            chipTotal -=500;
            break;
        case "yellowChip":
            totalBet +=1000;
            chipTotal -=1000;
            break;
        case "pinkChip":
            totalBet +=5000;
            chipTotal -=5000;
            break;
                }

        //update chip total
        document.getElementById("startingChipAmount").innerText = "$" + chipTotal;

        chipFormat(chipTotal);
}



//starting values
var playerTotal = 0;
var dealerTotal = 0;
var pxToMoveImgRight;
var pxToMoveImgBottom;
var splitCount = 0;
var secondHand = false;
var amountOfAces = 0;
var dealersAces = 0;
var playerFirstCard = null;
var dealerFirstCard = null;
var playerSecondCard = null;
var dealerSecondCard = null;
var totalBet = 0;
var chipTotal;





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

//Return point value of cards
function valueParser(cardValue, isPlayer){

    //get value of card
    switch(cardValue){
        case "A":
        if(isPlayer){amountOfAces++;}
        else{dealersAces++}
        return 11;
        case "K":
        case "Q":
        case "J":
            return 10;
        default: 
            return parseInt(cardValue);
    }

}

//adds card for the player
function playerHitCard(event){

    const button = event.target;
   
    //hide split button.
    button.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.style.visibility = "hidden";
    
    const newCard = deckShuffled.pop();

    //create img element and add it to end of that hands card list.
   /* var img = document.createElement("img");
    img.src = getCardImageLink(newCard.suite, newCard.value);
    var ul = button.parentNode.parentNode.childNodes[3];
    ul.append(img);*/


    var img = document.createElement("img");
    img.src = getCardImageLink(newCard.suite, newCard.value);
    var li = document.createElement("li");
    li.appendChild(img);
    var ul = button.parentNode.parentNode.childNodes[3];
    ul.append(li);
    
    //style for the new card
    img.style.position = "relative";
    img.style.right = (pxToMoveImgRight += 60) + "px";
    img.style.bottom = (pxToMoveImgBottom += 40) + "px";
   
    

    playerTotal += valueParser(newCard.value, true);
    
    //TODO-- case where player busts
    if(playerTotal > 21){
        
        //if the player has an ace
        if(amountOfAces > 0){
            amountOfAces--;
            playerTotal -= 10;
        }
        
    else{
       document.getElementById("buttons").style.visibility = "hidden";
       gameEnd();
       //TODO-end Game
    }
    }

}

function playerSplitCard(){

    if(playerFirstCard.value == playerSecondCard.value && splitCount == 0){
        
        //style
        const playersHands = document.getElementById("allHands");
        const playerFirstHand = document.getElementById("PlayerHand");
        document.getElementById("splitButton").style.visibility = "hidden";

       

        const playerSecondHand = playerFirstHand.cloneNode(true);
        playersHands.appendChild(playerSecondHand);

        //style Hands correctly on page.
        playerFirstHand.style.top = "235px";
        //playerFirstHand.style.right = "100%";
        playerFirstHand.style.right = "150px";
        playerSecondHand.style.position = "relative";
        playerSecondHand.style.left = "150px"; 

        //naming the cards correctly.
        playerSecondHand.id = "playerSecondHand";
        playerSecondHand.childNodes[1].style.visibility = "hidden";
        playerSecondHand.childNodes[3].childNodes[1].childNodes[0].id = "playerSecondHandFirstCard";
        playerSecondHand.childNodes[3].childNodes[3].childNodes[0].id = "playerSecondHandSecondCard";
        playerSecondHand.childNodes[5].style.visibility = "hidden";
        playerSecondHand.childNodes[5].childNodes[1].addEventListener("click",playerHitCard);
       
    }
}

function playerDoubleDown(event){

    const button = event.target;

    //logic for bet amount and update the bet Text
    chipTotal -= totalBet;
    totalBet *= 2;
    document.getElementById("betText").innerText = totalBet;
   
    //hide split button.
    button.parentNode.style.visibility = "hidden";
    document.getElementById("splitButton").style.visibility = "hidden";
    
    //draw top card from a deck
    const newCard = deckShuffled.pop();

    //create img element and add it to end of that hands card list.
    var img = document.createElement("img");
    img.src = getCardImageLink(newCard.suite, newCard.value);
    var ul = button.parentNode.parentNode.childNodes[3];
    ul.append(img);
    
    //style for the new card
    img.style.position = "relative";
    img.style.right = (pxToMoveImgRight += 50) + "px";
    img.style.bottom = (pxToMoveImgBottom += 70) + "px";
    img.style.rotate = "90deg";

    //setting values back to default
    pxToMoveImgBottom = 40;
    pxToMoveImgRight = 60;

    //getting value of new card and adding it to player Total. 
    //If total is over 21 and player has an A subtract 10.
    playerTotal += valueParser(newCard.value, true);
    
    //TODO-- case where player busts
    if(playerTotal > 21){
        
        //if the player has an ace
        if(amountOfAces > 0){
            amountOfAces--;
            playerTotal -= 10;
        }
    }

    DealersTurn();
}


//Let Dealer Draw
function playerStay(){
    document.getElementById("buttons").style.visibility = "hidden";
    //TODO-Fix
    document.getElementById("splitButton").style.visibility = "hidden";

    DealersTurn();
}

//Dealer Draw
function DealersTurn(){
   
     //Show Dealers first Card
     document.getElementById("dealerFirstCard").src = getCardImageLink(dealerFirstCard.suite, dealerFirstCard.value);
     document.getElementById("dealerSecondCard").style.top = "0px";
     document.getElementById("dealerFirstCard").style.left = "100px";
     

    while(dealerTotal < 17){

        const newCard = deckShuffled.pop();

       
        
        //audio for new card
        new Audio("cardFlip.mp3").play();
        setTimeout(dealerDraw, 400,newCard);
        dealerTotal += valueParser(newCard.value, false);

        //case where dealer is over 21 but has an A
        if(dealerTotal > 21 && dealersAces > 0){dealerTotal - 10;}
    }

    //gameEnds
    setTimeout(gameEnd, 2700);
    
}

function dealerDraw(newCard){
    //create img element and add it to end of that hands card list.
    

    var img = document.createElement("img");
    img.src = getCardImageLink(newCard.suite, newCard.value);
    var li = document.createElement("li");
    li.appendChild(img);
    var ul =  document.getElementById("dealerCardList");
    ul.append(li);
}    

//see who wins and award correct chips to player if won
function gameEnd(){
    
    
    //rewarding chips based on win, loss, or tie.
    if((playerTotal > dealerTotal && playerTotal < 22) || (dealerTotal > 21 && playerTotal < 22)){
        document.getElementById("endGameText").innerHTML = "FUCK YEA YOU WON THAT SHIT";
        totalBet *= 2;
    }
    else{
        document.getElementById("endGameText").innerHTML = "FUCK YOU SUCK, YOU JUST LOST TO A BOT\!";
        totalBet = 0;
    }

    if(playerTotal == dealerTotal){
        document.getElementById("endGameText").innerHtml = "DRAW";
        
    }

    document.getElementById("betText").innerText = totalBet;

    chipTotal += totalBet;

    document.getElementById("roundEnd").style.visibility = "visible";

    document.getElementById("newHandButton").addEventListener("click",gameTransition);

    

}

//style when a new hand is played
function gameTransition(){
    document.getElementById("DealerHand").style.visibility = "hidden";
    document.getElementById("allHands").style.visibility = "hidden";
    document.getElementById("roundEnd").style.visibility = "hidden";
    //document.getElementById("dealerCardList").remove();
    
    
    

    /*while(document.getElementById("dealerCardList").lastChild != document.getElementById("dealerSecondCard")){
        document.getElementById("dealerCardList").lastChild.remove();
    }*/
   
    //Setting dealerHand back to two cards.
    var lastCard = document.getElementById("dealerCardList").lastChild;
    while(document.getElementById("dealerSecondCard").parentElement != lastCard){
         lastCard = lastCard.previousSibling;
         lastCard.nextSibling.remove();
    }

    //Setting playerHandBack to Two Cards
    lastCard = document.getElementById("playerCardList").lastChild;
    while(document.getElementById("playerSecondCard").parentElement != lastCard){
         lastCard = lastCard.previousSibling;
         lastCard.nextSibling.remove();
    }

     //making sure bet is 0.
     totalBet = 0;

   

     document.getElementById("dealerFirstCard").src = "PlayingCards/cardBackGreen.png";
     document.getElementById("dealerSecondCard").style.top = "20px";
     document.getElementById("dealerFirstCard").style.left = "0px";

     chipFormat();
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
const deckShuffled = deckUnshuffled;
shuffleDeck(deckShuffled);



function newHand(){
//get starting cards

document.getElementById("chipList").style.visibility = "hidden";
//ToDo --Make more effecient
document.getElementById("buttons").style.visibility = "visible";
document.getElementById("splitButton").style.visibility = "visible";

//showing what the player Bet
document.getElementById("betText").innerText = totalBet;
console.log(totalBet);

//ToDo --Make more effecient
pxToMoveImgRight = 60;
 pxToMoveImgBottom = 40;


 playerFirstCard = deckShuffled.pop();
 dealerFirstCard = deckShuffled.pop();
 playerSecondCard = deckShuffled.pop();
 dealerSecondCard = deckShuffled.pop();

 //get total for player
 playerTotal = valueParser(playerFirstCard.value, true) + valueParser(playerSecondCard.value, true)
 dealerTotal = valueParser(dealerFirstCard.value, false) + valueParser(dealerSecondCard.value, false)

 //show hands
 document.getElementById("DealerHand").style.visibility = "visible";
 document.getElementById("allHands").style.visibility = "visible";


//BlackJack For Player
if(valueParser(playerFirstCard.value, true)  + valueParser(playerSecondCard.value, true) == 21){
   document.getElementById("blackJackParagraph").style.visibility = "visible";
    
}

//show starting cards
document.getElementById("playerFirstCard").src = getCardImageLink(playerFirstCard.suite, playerFirstCard.value);
document.getElementById("dealerSecondCard").src = getCardImageLink(dealerSecondCard.suite, dealerSecondCard.value);
document.getElementById("playerSecondCard").src = getCardImageLink(playerSecondCard.suite, playerSecondCard.value);

//look for hit button to be clicked
document.getElementById("hitButton").addEventListener("click",playerHitCard);

//look for split button to be clicked
document.getElementById("splitButton").addEventListener("click", playerSplitCard);

//look for stay button to be pressed
document.getElementById("stayButton").addEventListener("click", playerStay);

//look for double
document.getElementById("doubleButton").addEventListener("click", playerDoubleDown);
}

//look for start game button to be pressed
document.getElementById("startGameButton").addEventListener("click",startGame);
