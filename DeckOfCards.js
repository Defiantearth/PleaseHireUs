
function startGame(){
    
    //pull up the betting phase of the game.
    document.getElementById("startGameButton").remove();
    document.getElementById("startingHeader").remove();
    document.getElementById("chipList").style.visibility = "visible";
    
    //making the background appear
    document.body.style.backgroundImage = "url(BJTable.png)";


    //get value of starting chips
    chipTotal = 100;
    

    
    chipFormat();
}

function chipFormat(){
    //var for how far to move place Bet button
    var moveButtonLeft = 0;
    
    //display what chips the player has avalible
    document.getElementById("chipList").style.visibility = "visible";
    document.getElementById("startingChipAmount").innerText = "$" + chipTotal;
   
    //make chips visible if they have become hidden previously.
    document.getElementById("pinkChip").style.visibility = "unset";
    document.getElementById("yellowChip").style.visibility = "unset";
    document.getElementById("purpleChip").style.visibility = "unset";
    document.getElementById("blackChip").style.visibility = "unset";
    document.getElementById("greenChip").style.visibility = "unset";
    document.getElementById("redChip").style.visibility = "unset";
    document.getElementById("blueChip").style.visibility = "unset";
    
    
    
    if(chipTotal < 5000){document.getElementById("pinkChip").style.visibility = "hidden"; moveButtonLeft = 1;}
         if (chipTotal < 1000){document.getElementById("yellowChip").style.visibility = "hidden";  moveButtonLeft = 2;}
             if (chipTotal < 500){document.getElementById("purpleChip").style.visibility = "hidden";  moveButtonLeft = 3;}
                 if (chipTotal < 100){document.getElementById("blackChip").style.visibility = "hidden";  moveButtonLeft = 4;}
                     if (chipTotal < 25){document.getElementById("greenChip").style.visibility = "hidden";  moveButtonLeft = 5;}
                         if (chipTotal < 5){document.getElementById("redChip").style.visibility = "hidden";  moveButtonLeft = 6;}
                            if (chipTotal < 1){document.getElementById("blueChip").style.visibility = "hidden";  moveButtonLeft = 7;}
    //move button left depending on how many chips are showing
    document.getElementById("PlaceBetButton").style.right = (moveButtonLeft * 87) +"px";
     

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
var playerFirstHandTotal;
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
var getValueOfBothHands = false;
var firstHandBust = false;





//return link for a specific card
function getCardImageLink(suite, value){
    //fix for if card is a 10
    if(value === "10"){value = "T";}
    
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
function valueParser(cardValue, isPlayer, accountForAces){

    //get value of card
    switch(cardValue){
        case "A":
        if(accountForAces){ if(isPlayer){amountOfAces++;}
        else{dealersAces++}}
        return 11;
        case "K":
        case "Q":
        case "J":
        case "T":
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
   

    playerTotal += valueParser(newCard.value, true, true);
    
    //TODO-- case where player busts
    if(playerTotal > 21){
        
        //if the player has an ace
        if(amountOfAces > 0){
            amountOfAces--;
            playerTotal -= 10;
        }
        
    else{
       //make buttons hidden
       button.parentElement.style.visibility = "hidden";
       
       //if first hand did not bust and second hand did
       if(firstHandBust){DealersTurn();}
       if(secondHand){firstHandBust = true;}

       

       gameEnd();
       
       //TODO-end Game
    }
    }

}

function playerSplitCard(){ 

    if(playerFirstCard.value === playerSecondCard.value && splitCount === 0){
        
        //style
        const playersHands = document.getElementById("allHands");
        const playerFirstHand = document.getElementById("PlayerHand");
        document.getElementById("splitButton").style.visibility = "hidden";

       

        const playerSecondHand = playerFirstHand.cloneNode(true);
        playersHands.appendChild(playerSecondHand);
        

        //style Hands correctly on page.
        playerFirstHand.style.top = "385px";
        playerSecondHand.style.top = "70px";
        playerFirstHand.style.right = "200px";
        playerSecondHand.style.position = "relative";
        playerSecondHand.style.left = "200px"; 
        
        //naming the cards correctly.
        playerSecondHand.id = "playerSecondHand";
        playerSecondHand.childNodes[1].style.visibility = "hidden";
        playerSecondHand.childNodes[3].childNodes[1].childNodes[0].id = "playerSecondHandFirstCard";
        playerSecondHand.childNodes[3].childNodes[3].childNodes[0].id = "playerSecondHandSecondCard";
        playerSecondHand.childNodes[5].style.visibility = "hidden";
        //add event listners for next hand buttons.
        playerSecondHand.childNodes[5].childNodes[1].addEventListener("click",playerHitCard);
        playerSecondHand.childNodes[5].childNodes[3].addEventListener("click",playerStay);
        playerSecondHand.childNodes[5].childNodes[5].addEventListener("click",playerDoubleDown);
        //giving cards correct values
        var handOneNewCard = deckShuffled.pop();
        var handTwoNewCard = deckShuffled.pop();
        document.getElementById("playerSecondCard").src = getCardImageLink(handOneNewCard.suite, handOneNewCard.value);
        document.getElementById("playerSecondHandFirstCard").src = document.getElementById("playerSecondHandSecondCard").src;
        document.getElementById("playerSecondHandSecondCard").src = getCardImageLink(handTwoNewCard.suite, handTwoNewCard.value);

        //setting scores to correct values
        playerTotal = (playerTotal/2) + valueParser(handOneNewCard.value, true, true);

        if(playerSecondCard.value === "A"){amountOfAces--;}
      
        secondHand = true;

        chipTotal -=totalBet;
    }
}

function playerDoubleDown(event){

    const button = event.target;

    //logic for bet amount and update the bet Text
    chipTotal -= totalBet;
    totalBet *= 2;
    document.getElementById("betText").innerText = "$" + totalBet;
   
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
    playerTotal += valueParser(newCard.value, true, true);

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
function playerStay(event){
    //document.getElementById("buttons").style.visibility = "hidden";
    //TODO-Fix
    //document.getElementById("splitButton").style.visibility = "hidden";
    event.target.parentElement.style.visibility = "hidden";
    event.target.nextSibling.nextSibling.nextSibling.nextSibling.style.visibility = "hidden";

   
    DealersTurn();
}


//function for audio of card being placed for dealer
function cardAudio(){
    new Audio("cardFlip.mp3").play();
}

//Dealer Draw
function DealersTurn(){

//if player Has another Hand
if(!secondHand){
    //time between dealer dealing each card
    var delay = 1000;

        //Show Dealers first Card
        document.getElementById("dealerFirstCard").src = getCardImageLink(dealerFirstCard.suite, dealerFirstCard.value);
        document.getElementById("dealerSecondCard").style.top = "0px";
        document.getElementById("dealerFirstCard").style.left = "100px";
        

        while(dealerTotal < 17){

            const newCard = deckShuffled.pop();

        
            
            //audio for new card
            setTimeout(cardAudio, delay - 400);
            setTimeout(dealerDraw, delay,newCard);
            delay += 1500;
            dealerTotal += valueParser(newCard.value, false, true);


            //case where dealer is over 21 but has an A
            if(dealerTotal > 21 && dealersAces > 0){dealerTotal -= 10; dealersAces--;}
        }
    
    //gameEnds
    setTimeout(gameEnd, delay + 1000);
}
//when player splits hand
else{
    //storve value of hand
    playerFirstHandTotal = playerTotal;
    //set second hand to false
    secondHand = false;
    //make buttons of second hand visible.
    document.getElementById("playerSecondHand").childNodes[5].style.visibility = "visible";
    
    //setting values to move card to original
    pxToMoveImgBottom = 40;
    pxToMoveImgRight = 60;
    
    //length of link string
    var linkLength = document.getElementById("playerSecondHandFirstCard").src.length;
    
    amountOfAces = 0;

    //get value of 2nd hand and set it.
    playerTotal = valueParser(document.getElementById("playerSecondHandFirstCard").src.substring(linkLength-6,linkLength-5), true, true) + valueParser(document.getElementById("playerSecondHandSecondCard").src.substring(linkLength-6,linkLength-5), true, true);
    
    getValueOfBothHands = true;

}

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
    
    var sign = "";
    
    //when hit busts and you have multiple hands
    if(secondHand){
        //set second hand to false
        secondHand = false;
        //make buttons of second hand visible.
        document.getElementById("playerSecondHand").childNodes[5].style.visibility = "visible";
        
        //setting values to move card to original
        pxToMoveImgBottom = 40;
        pxToMoveImgRight = 60;
        
        //length of link string
        var linkLength = document.getElementById("playerSecondHandFirstCard").src.length;
        
        amountOfAces = 0;
        playerFirstHandTotal = playerTotal;
        //get value of 2nd hand and set it.
        playerTotal = valueParser(document.getElementById("playerSecondHandFirstCard").src.substring(linkLength-6,linkLength-5), true, true) + valueParser(document.getElementById("playerSecondHandSecondCard").src.substring(linkLength-6,linkLength-5), true, true);
        console.log(playerTotal);
        console.log(playerFirstHandTotal);
        getValueOfBothHands = true;
 
        return;
     }
 
    
    if(getValueOfBothHands){
        //first hand
        //rewarding chips based on win, loss, or tie.
        //value to keep track of original total bet
        var originalTotalBet = totalBet;
        if((playerFirstHandTotal > dealerTotal && playerFirstHandTotal < 22) || (dealerTotal > 21 && playerFirstHandTotal < 22)){
            if(document.getElementById("playerCardList").childElementCount === 2 && playerFirstHandTotal === 21){
                totalBet *=2.5;
            }
            else{
            totalBet *= 2;
            }
            sign = "+";
        }

        else if(playerFirstHandTotal === dealerTotal && !(dealerTotal > 21)){
           
        }

        else{
                totalBet = 0;
                document.getElementById("betText").style.color = "red";
        
        }

        document.getElementById("betText").innerText = sign + " $" + totalBet;

        chipTotal += totalBet;
    
        //reseting total Bet
        totalBet = originalTotalBet;

        //second hand
            if((playerTotal > dealerTotal && playerTotal < 22) || (dealerTotal > 21 && playerTotal < 22)){
                if(document.getElementById("playerSecondHand").childNodes[3].childElementCount === 2 && playerTotal === 21){
                    totalBet *= 2.5;
                }
                else{
                totalBet *= 2;
                }
                sign = "+";
            }

            else if(playerTotal === dealerTotal){
                
            }

            else{
                    totalBet = 0;
                    document.getElementById("playerSecondHand").childNodes[7].style.color = "red";
            
            }

           document.getElementById("playerSecondHand").childNodes[7].innerText = sign + " $" + totalBet;

            chipTotal += totalBet;
        

    document.getElementById("roundEnd").style.visibility = "visible";
        }

        //if we only get value of first hand
        else{
            if((playerTotal > dealerTotal && playerTotal < 22) || (dealerTotal > 21 && playerTotal < 22)){
                //checking for blackjack
                if(document.getElementById("playerCardList").childElementCount === 2 && playerTotal === 21){
                    totalBet *=2.5;
                }
                else{
                totalBet *= 2;
                }
                sign = "+";
            }

            else if(playerTotal === dealerTotal){
                
            }

            else{
                    totalBet = 0;
                    document.getElementById("betText").style.color = "red";
            
            }

            document.getElementById("betText").innerText = sign + " $" + totalBet;

            chipTotal += totalBet;
        

    document.getElementById("roundEnd").style.visibility = "visible";
        }

    //will have player play second hand if they split and bust
    
    document.getElementById("newHandButton").addEventListener("click",gameTransition);

    

}

//style when a new hand is played
function gameTransition(){
    document.getElementById("DealerHand").style.visibility = "hidden";
    document.getElementById("allHands").style.visibility = "hidden";
    document.getElementById("roundEnd").style.visibility = "hidden";
    document.getElementById("betText").style.color = "rgb(88, 228, 33)";
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

    //getting rid of second hand and setting getValue of second hand to false.
    if(getValueOfBothHands){
        document.getElementById("playerSecondHand").remove();
        getValueOfBothHands = false;
        document.getElementById("allHands").style.left  = "45%";
        document.getElementById("allHands").style.bottom = "10%";
        document.getElementById("PlayerHand").style.top = "70px";
        document.getElementById("PlayerHand").style.right = "0px";
        firstHandBust = false;
    }

     //making sure bet is 0. making sure amount of aces for both are 0.
     totalBet = 0;
     dealersAces = 0;
     amountOfAces = 0;
   

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
document.getElementById("betText").innerText = "$" + totalBet;

//format players bet;
var betTextLength = totalBet.toString.length;

document.getElementById("betText").style.left = ( 10 + (betTextLength * 15)) + "px";

//ToDo --Make more effecient
pxToMoveImgRight = 60;
 pxToMoveImgBottom = 40;


 playerFirstCard = deckShuffled.pop();
 dealerFirstCard = deckShuffled.pop();
 playerSecondCard = deckShuffled.pop();
 dealerSecondCard = deckShuffled.pop();


 //get total for player
 playerTotal = valueParser(playerFirstCard.value, true, true) + valueParser(playerSecondCard.value, true, true)
 dealerTotal = valueParser(dealerFirstCard.value, false, true) + valueParser(dealerSecondCard.value, false, true)

 //show hands
 document.getElementById("DealerHand").style.visibility = "visible";
 document.getElementById("allHands").style.visibility = "visible";




//BlackJack For Player
if(valueParser(playerFirstCard.value, true, false)  + valueParser(playerSecondCard.value, true, false) === 21){
    document.getElementById("buttons").style.visibility = "hidden";
    document.getElementById("splitButton").style.visibility = "hidden";
    setTimeout(DealersTurn,1000);
    
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
