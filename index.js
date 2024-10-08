const nextButton = document.getElementById("nextButton");
const header = document.getElementById("header");

var checkboxes = document.getElementsByName("options");
var labels = document.getElementsByClassName("cbLabel");

var stage = -1;

const synth = window.speechSynthesis;
var voices = window.speechSynthesis.getVoices();

setTimeout(function(){console.log(voices);},3000);


var msg = new SpeechSynthesisUtterance();


while(stage == -1){
    textToSpeech(header.textContent, 7);
    stage++;
}

nextButton.onclick = function(){

    if((checkIfAnyCheckboxIsChecked() || stage == 2) && stage >= 0){
        stage++;
    }
    uncheckAll();

    if(stage == 1){
        synth.cancel();
        setAttributeTypeTo("radio");
        header.textContent = "For how long have you had them?";
        textToSpeech(header.textContent, 7);

        labels[0].textContent = "<1 day";
        labels[1].textContent = "2 to 7 days";
        labels[2].textContent = ">7";
        document.getElementById("myCheckboxs").removeChild(labels[3]);
        document.getElementById("myCheckboxs").removeChild(checkboxes[3]);
    }

    else if(stage == 2){
        synth.cancel();
        hideLabelsAndCheckboxes();
        header.textContent = "Check completed. Press \"Submit\" button to see the results.";
        textToSpeech(header.textContent, 7); 

        document.getElementById("myCheckboxs").remove();

        nextButton.textContent = "Submit";
        nextButton.style.padding = "30px 60px";
        nextButton.style.fontSize = "2em";
    }
    
    else if(stage == 3){
        synth.cancel();
        nextButton.style.display = "none";
        header.style.fontSize = "2em";

        var message = "Congratulations! \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nYou have terminal cancer!";
        textPrinter(message, 40);
        textToSpeech(message, 7);    
    }
}




function textToSpeech(text, voiceType){
    console.log(voices);
    voices = synth.getVoices();
    console.log(voices);
    msg.text = text;
    msg.voice = voices[voiceType];
    synth.speak(msg);
}

function checkIfAnyCheckboxIsChecked(){
    var checkedBoxes = 0;
    for(var i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            checkedBoxes++;
        }
    }

    if(checkedBoxes > 0){
        return true;
    }
    return false;
}

async function textPrinter(text, delay){
    var textArray = text.split("");

    var printer = [];

    for(var i = 0; i < textArray.length; i++){
        printer[i] = String(textArray[i]);
        header.textContent = String(printer.join(""));
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

function hideLabelsAndCheckboxes(){
    for(var i = 0; i < checkboxes.length; i++){
        checkboxes[i].style.display = "none";
    }
    for(var i = 0; i < labels.length; i++){
        labels[i].style.display = "none";
    }
}

function setAttributeTypeTo(attributeType){
    for(var i = 0; i < checkboxes.length; i++){
        checkboxes[i].setAttribute("type", attributeType);
    }
}

function uncheckAll(){
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
}
