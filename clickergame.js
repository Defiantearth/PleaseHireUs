//increases counter by one when button is clicked
function buttonClicked(){
    
    const totalClicks = document.getElementById("buttonTotal");
    var sumValue = parseInt(totalClicks.innerText)
    sumValue++;
    var size;
    //counter when it is between 10 and 20
    if(sumValue >= 10 && sumValue < 21)
        {
            document.getElementById("buttonTotal").style.color="red";
            document.getElementById("buttonTotal").style.textAlign = "center";
            document.getElementById("buttonTotal").style.fontSize = "100px";

            document.getElementById("button1").innerHTML = "No More";
            document.getElementById("button1").style.bottom = ((sumValue % 10 * 100).toString() + "px")
            document.body.style.backgroundColor = "black";


        }

        //counter btw 50 and 100
    if(sumValue >= 50 && sumValue < 89)
    {
        

    }
    
    
    

    document.getElementById("buttonTotal").innerHTML = sumValue;
    
}